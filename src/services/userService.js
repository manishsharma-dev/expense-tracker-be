const User = require('../models/User');
const Country = require('../models/Country');

const profileReminderIntervalMs = 24 * 60 * 60 * 1000;
const editableProfileFields = ['name', 'email', 'phone', 'gender', 'dateOfBirth', 'country', 'preferences'];

const normalizeOptionalString = (value) => {
  if (value === undefined) return undefined;
  const normalized = `${value}`.trim();
  return normalized || null;
};

const normalizePhoneNumber = (phone, country) => {
  const value = normalizeOptionalString(phone);
  if (!value) return value;

  const hasInternationalPrefix = value.trim().startsWith('+');
  const digits = value.replace(/\D/g, '');
  if (!digits) return null;

  if (hasInternationalPrefix) return `+${digits}`;
  if (value.trim().startsWith('00')) return `+${digits.slice(2)}`;

  const countryPhoneCode = `${country?.phoneCode || ''}`.replace(/\D/g, '');
  if (countryPhoneCode && !digits.startsWith(countryPhoneCode)) {
    return `+${countryPhoneCode}${digits.replace(/^0+/, '')}`;
  }

  return digits;
};

const normalizeProfileUpdates = (updates = {}, country) => {
  const normalized = {};

  if (Object.prototype.hasOwnProperty.call(updates, 'name')) {
    normalized.name = normalizeOptionalString(updates.name);
  }
  if (Object.prototype.hasOwnProperty.call(updates, 'email')) {
    normalized.email = normalizeOptionalString(updates.email)?.toLowerCase();
  }
  if (Object.prototype.hasOwnProperty.call(updates, 'phone')) {
    normalized.phone = normalizePhoneNumber(updates.phone, country);
  }
  if (Object.prototype.hasOwnProperty.call(updates, 'gender')) {
    normalized.gender = normalizeOptionalString(updates.gender);
  }
  if (Object.prototype.hasOwnProperty.call(updates, 'country')) {
    normalized.country = normalizeOptionalString(updates.country);
  }
  if (Object.prototype.hasOwnProperty.call(updates, 'dateOfBirth')) {
    normalized.dateOfBirth = updates.dateOfBirth ? new Date(updates.dateOfBirth) : undefined;
  }
  if (Object.prototype.hasOwnProperty.call(updates, 'preferences')) {
    normalized.preferences = {};
    if (Object.prototype.hasOwnProperty.call(updates.preferences || {}, 'saveScannedReceiptWithExpense')) {
      normalized.preferences.saveScannedReceiptWithExpense = Boolean(updates.preferences.saveScannedReceiptWithExpense);
    }
  }

  Object.keys(normalized).forEach((key) => {
    if (!editableProfileFields.includes(key)) delete normalized[key];
  });

  return normalized;
};

const ensureUniqueProfileContact = async ({ userId, email, phone }) => {
  const duplicateQuery = [];
  if (email) duplicateQuery.push({ email });
  if (phone) duplicateQuery.push({ phone });
  if (!duplicateQuery.length) return;

  const existing = await User.findOne({ _id: { $ne: userId }, $or: duplicateQuery });
  if (existing?.email === email) {
    throw Object.assign(new Error('Email is already in use'), { statusCode: 409 });
  }
  if (existing?.phone === phone) {
    throw Object.assign(new Error('Phone number is already in use'), { statusCode: 409 });
  }
};

const validateProfileCountry = async (country) => {
  if (!country) return;
  const existingCountry = await Country.findById(country);
  if (!existingCountry) {
    throw Object.assign(new Error('Country not found'), { statusCode: 400 });
  }
  return existingCountry;
};

const isProfileComplete = (user) => Boolean(user?.name && user?.gender && (user?.email || user?.phone));

const shouldPromptProfile = (user) => {
  if (isProfileComplete(user)) return false;
  if (!user.profileReminderDismissedAt) return true;

  return Date.now() - new Date(user.profileReminderDismissedAt).getTime() >= profileReminderIntervalMs;
};

const toUserResponse = (user) => {
  const value = typeof user.toObject === 'function' ? user.toObject() : user;
  return {
    ...value,
    profileComplete: isProfileComplete(value),
    shouldPromptProfile: shouldPromptProfile(value),
  };
};

const getAllUsers = async ({ page = 1, limit = 10, search = '' } = {}) => {
  const query = search
    ? { $or: [{ name: new RegExp(search, 'i') }, { email: new RegExp(search, 'i') }] }
    : {};

  const skip = (page - 1) * limit;
  const [users, total] = await Promise.all([
    User.find(query).skip(skip).limit(limit).sort({ createdAt: -1 }).populate('country'),
    User.countDocuments(query),
  ]);

  return { users, total, page, pages: Math.ceil(total / limit) };
};

const getUserById = async (id) => {
  const user = await User.findById(id).populate('country');
  if (!user) throw Object.assign(new Error('User not found'), { statusCode: 404 });
  return user;
};

const updateUser = async (id, updates) => {
  const forbidden = ['role'];
  forbidden.forEach((f) => delete updates[f]);

  const user = await User.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  }).populate('country');
  if (!user) throw Object.assign(new Error('User not found'), { statusCode: 404 });
  return user;
};

const updateOwnProfile = async (userId, updates) => {
  const existingUser = await User.findById(userId);
  if (!existingUser) throw Object.assign(new Error('User not found'), { statusCode: 404 });

  const requestedCountryId = Object.prototype.hasOwnProperty.call(updates, 'country')
    ? normalizeOptionalString(updates.country)
    : existingUser.country;
  const selectedCountry = await validateProfileCountry(requestedCountryId);
  const normalizedUpdates = normalizeProfileUpdates(updates, selectedCountry);
  const nextEmail = Object.prototype.hasOwnProperty.call(normalizedUpdates, 'email')
    ? normalizedUpdates.email
    : existingUser.email;
  const nextPhone = Object.prototype.hasOwnProperty.call(normalizedUpdates, 'phone')
    ? normalizedUpdates.phone
    : existingUser.phone;

  if (!nextEmail && !nextPhone) {
    throw Object.assign(new Error('Either email or phone is required'), { statusCode: 400 });
  }

  await ensureUniqueProfileContact({
    userId,
    email: nextEmail,
    phone: nextPhone,
  });

  const setUpdates = {};
  const unsetUpdates = {};
  Object.entries(normalizedUpdates).forEach(([key, value]) => {
    if (key === 'preferences') {
      Object.entries(value).forEach(([preferenceKey, preferenceValue]) => {
        setUpdates[`preferences.${preferenceKey}`] = preferenceValue;
      });
      return;
    }

    if (value === null || value === undefined) {
      unsetUpdates[key] = '';
    } else {
      setUpdates[key] = value;
    }
  });

  const updatePayload = {};
  if (Object.keys(setUpdates).length) updatePayload.$set = setUpdates;
  if (Object.keys(unsetUpdates).length) updatePayload.$unset = unsetUpdates;
  if (!Object.keys(updatePayload).length) {
    return existingUser.populate('country');
  }

  const user = await User.findByIdAndUpdate(userId, updatePayload, {
    new: true,
    runValidators: true,
  }).populate('country');
  if (!user) throw Object.assign(new Error('User not found'), { statusCode: 404 });
  return user;
};

const dismissProfileReminder = async (userId) => {
  const user = await User.findByIdAndUpdate(
    userId,
    { profileReminderDismissedAt: new Date() },
    { new: true, runValidators: true }
  ).populate('country');
  if (!user) throw Object.assign(new Error('User not found'), { statusCode: 404 });
  return user;
};

const deleteUser = async (id) => {
  const user = await User.findByIdAndDelete(id);
  if (!user) throw Object.assign(new Error('User not found'), { statusCode: 404 });
  return user;
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  updateOwnProfile,
  dismissProfileReminder,
  deleteUser,
  toUserResponse,
};
