const User = require('../models/User');

const getAllUsers = async ({ page = 1, limit = 10, search = '' } = {}) => {
  const query = search
    ? { $or: [{ name: new RegExp(search, 'i') }, { email: new RegExp(search, 'i') }] }
    : {};

  const skip = (page - 1) * limit;
  const [users, total] = await Promise.all([
    User.find(query).skip(skip).limit(limit).sort({ createdAt: -1 }),
    User.countDocuments(query),
  ]);

  return { users, total, page, pages: Math.ceil(total / limit) };
};

const getUserById = async (id) => {
  const user = await User.findById(id);
  if (!user) throw Object.assign(new Error('User not found'), { statusCode: 404 });
  return user;
};

const updateUser = async (id, updates) => {
  const forbidden = ['password', 'role'];
  forbidden.forEach((f) => delete updates[f]);

  const user = await User.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  });
  if (!user) throw Object.assign(new Error('User not found'), { statusCode: 404 });
  return user;
};

const deleteUser = async (id) => {
  const user = await User.findByIdAndDelete(id);
  if (!user) throw Object.assign(new Error('User not found'), { statusCode: 404 });
  return user;
};

module.exports = { getAllUsers, getUserById, updateUser, deleteUser };
