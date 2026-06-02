const { sign } = require('jsonwebtoken');
const { Types } = require('mongoose');
const User = require('../models/User');
const Country = require('../models/Country');
const { getRedisClient } = require('../config/redis');

const OTP_TTL_SECONDS = Number(process.env.AUTH_OTP_TTL_SECONDS) || 5 * 60;

const generateToken = (userId) =>
  sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });

const isEmail = (identifier) => /^\S+@\S+\.\S+$/.test(identifier);
const isPhone = (identifier) => /^\+?[1-9]\d{1,14}$/.test(identifier);

const normalizeIdentifier = (identifier) => {
  const value = identifier.trim();
  return isEmail(value) ? value.toLowerCase() : value;
};

const getIdentifierType = (identifier) => {
  if (isEmail(identifier)) return 'email';
  if (isPhone(identifier)) return 'phone';
  throw Object.assign(new Error('Identifier must be a valid email or phone number'), { statusCode: 400 });
};

const getOtpKey = (identifier) => `auth:otp:${normalizeIdentifier(identifier)}`;
const generateOtp = () => String(Math.floor(100000 + Math.random() * 900000));

const deriveName = ({ name, email, phone }) => {
  if (name?.trim()) return name.trim();
  if (email) return email.split('@')[0];
  return phone;
};

const validateCountry = async (country) => {
  if (!country) return;
  if (!Types.ObjectId.isValid(country)) {
    throw Object.assign(new Error('Country must be a valid id'), { statusCode: 400 });
  }
  const existingCountry = await Country.findById(country);
  if (!existingCountry) {
    throw Object.assign(new Error('Country not found'), { statusCode: 400 });
  }
};

const register = async ({ name, email, phone, country }) => {
  const normalizedEmail = email?.trim().toLowerCase();
  const normalizedPhone = phone?.trim();

  if (!normalizedEmail && !normalizedPhone) {
    throw Object.assign(new Error('Either email or phone is required'), { statusCode: 400 });
  }

  await validateCountry(country);

  const duplicateQuery = [];
  if (normalizedEmail) duplicateQuery.push({ email: normalizedEmail });
  if (normalizedPhone) duplicateQuery.push({ phone: normalizedPhone });

  const existing = await User.findOne({ $or: duplicateQuery });
  if (existing) {
    throw Object.assign(new Error('User already exists'), { statusCode: 409 });
  }

  const user = await User.create({
    name: deriveName({ name, email: normalizedEmail, phone: normalizedPhone }),
    email: normalizedEmail,
    phone: normalizedPhone,
    country,
  });
  await user.populate('country');
  return { user };
};

const findOrCreateUserForIdentifier = async (identifier) => {
  const normalizedIdentifier = normalizeIdentifier(identifier);
  const identifierType = getIdentifierType(normalizedIdentifier);
  const query = { [identifierType]: normalizedIdentifier };
  const existingUser = await User.findOne(query).populate('country');

  if (existingUser) {
    if (!existingUser.isActive) {
      throw Object.assign(new Error('Account is deactivated'), { statusCode: 403 });
    }
    return existingUser;
  }

  const user = await User.create({
    [identifierType]: normalizedIdentifier,
    name: deriveName({
      email: identifierType === 'email' ? normalizedIdentifier : undefined,
      phone: identifierType === 'phone' ? normalizedIdentifier : undefined,
    }),
  });
  return user.populate('country');
};

const requestOtp = async ({ identifier }) => {
  const normalizedIdentifier = normalizeIdentifier(identifier);
  getIdentifierType(normalizedIdentifier);
  await findOrCreateUserForIdentifier(normalizedIdentifier);

  const otp = generateOtp();
  const redis = await getRedisClient();
  await redis.set(getOtpKey(normalizedIdentifier), otp, { EX: OTP_TTL_SECONDS });

  return {
    deliveryMethod: isEmail(normalizedIdentifier) ? 'email' : 'phone',
    expiresIn: OTP_TTL_SECONDS,
    ...(process.env.NODE_ENV !== 'production' && { otp }),
  };
};

const verifyOtp = async ({ identifier, otp }) => {
  const normalizedIdentifier = normalizeIdentifier(identifier);
  const redis = await getRedisClient();
  const otpKey = getOtpKey(normalizedIdentifier);
  const cachedOtp = await redis.get(otpKey);

  if (!cachedOtp || cachedOtp !== otp) {
    throw Object.assign(new Error('Invalid or expired OTP'), { statusCode: 401 });
  }

  const user = await findOrCreateUserForIdentifier(normalizedIdentifier);
  await redis.del(otpKey);

  const token = generateToken(user._id);
  return { user, token };
};

module.exports = {
  register,
  requestOtp,
  verifyOtp,
  generateToken,
};
