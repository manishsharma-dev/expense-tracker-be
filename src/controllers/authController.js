const { validationResult } = require('express-validator');
const sendSMS = require('../services/smsService');
const {
  register: _register,
  requestOtp: _requestOtp,
  verifyOtp: _verifyOtp,
} = require('../services/authService');
const { sendCreated, sendSuccess, sendBadRequest, sendError } = require('../utils/apiResponse');

const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return sendBadRequest(res, 'Validation failed', errors.array());

  try {
    const { user } = await _register(req.body);
    sendCreated(res, { user }, 'Registration successful');
  } catch (err) {
    sendError(res, err.message, err.statusCode || 500);
  }
};

const requestOtp = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return sendBadRequest(res, 'Validation failed', errors.array());

  try {
    const result = await _requestOtp(req.body);
    await sendSMS(result.mobileNumber, result.otp);
    sendSuccess(res, result, 'OTP sent successfully');
  } catch (err) {
    sendError(res, err.message, err.statusCode || 500);
  }
};

const verifyOtp = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return sendBadRequest(res, 'Validation failed', errors.array());

  try {
    const { user, token } = await _verifyOtp(req.body);
    sendSuccess(res, { user, token }, 'Login successful');
  } catch (err) {
    sendError(res, err.message, err.statusCode || 500);
  }
};

const getMe = (req, res) => sendSuccess(res, { user: req.user }, 'Profile fetched');

module.exports = {
  register,
  requestOtp,
  verifyOtp,
  getMe,
};
