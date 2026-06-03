const { validationResult } = require('express-validator');
const sendSMS = require('../services/smsService');
const {
  register: _register,
  requestOtp: _requestOtp,
  verifyOtp: _verifyOtp,
  createLoginSession: _createLoginSession,
  logout: _logout,
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
    const { otp, ...response } = result;
    if (result.deliveryMethod === 'phone') {
      await sendSMS(result.recipient, otp);
    }
    sendSuccess(
      res,
      {
        ...response,
        ...(process.env.NODE_ENV !== 'production' && { otp }),
      },
      'OTP sent successfully'
    );
  } catch (err) {
    sendError(res, err.message, err.statusCode || 500);
  }
};

const verifyOtp = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return sendBadRequest(res, 'Validation failed', errors.array());

  try {
    const { user, token } = await _verifyOtp(req.body);
    const session = await _createLoginSession({
      user,
      token,
      identifier: req.body.identifier,
      deviceId: req.body.deviceId,
      req,
    });
    sendSuccess(res, { user, token, sessionId: session._id }, 'Login successful');
  } catch (err) {
    sendError(res, err.message, err.statusCode || 500);
  }
};

const logout = async (req, res) => {
  try {
    await _logout({ token: req.accessToken });
    sendSuccess(res, null, 'Logout successful');
  } catch (err) {
    sendError(res, err.message, err.statusCode || 500);
  }
};

const getMe = (req, res) => sendSuccess(res, { user: req.user }, 'Profile fetched');

module.exports = {
  register,
  requestOtp,
  verifyOtp,
  logout,
  getMe,
};
