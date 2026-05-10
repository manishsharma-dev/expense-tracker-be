const { sign } = require('jsonwebtoken');
const { Types } = require('mongoose');
const User = require('../models/User');
const Country = require('../models/Country');

const generateToken = (userId) =>
  sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });

const register = async ({ name, email, password, country }) => {
  const existing = await User.findOne({ email });
  if (existing) throw Object.assign(new Error('Email already in use'), { statusCode: 409 });

  if (country) {
    if (!Types.ObjectId.isValid(country)) {
      throw Object.assign(new Error('Country must be a valid id'), { statusCode: 400 });
    }
    const existingCountry = await Country.findById(country);
    if (!existingCountry) {
      throw Object.assign(new Error('Country not found'), { statusCode: 400 });
    }
  }

  const user = await User.create({ name, email, password, country });
  await user.populate('country');
  const token = generateToken(user._id);
  return { user, token };
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ email }).select('+password').populate('country');
  if (!user || !(await user.comparePassword(password))) {
    throw Object.assign(new Error('Invalid email or password'), { statusCode: 401 });
  }
  if (!user.isActive) {
    throw Object.assign(new Error('Account is deactivated'), { statusCode: 403 });
  }
  const token = generateToken(user._id);
  return { user, token };
};

module.exports = { register, login, generateToken };
