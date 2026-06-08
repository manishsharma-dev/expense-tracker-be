const { validationResult } = require('express-validator');
const sendSMS = require('../services/smsService');
const { sendEmail } = require('../services/mailService');
const {
  register: _register,
  requestOtp: _requestOtp,
  verifyOtp: _verifyOtp,
  createLoginSession: _createLoginSession,
  logout: _logout,
} = require('../services/authService');
const { sendCreated, sendSuccess, sendBadRequest, sendError } = require('../utils/apiResponse');

const cookieName = process.env.AUTH_COOKIE_NAME || 'access_token';

const getCookieMaxAge = () => {
  const days = Number(process.env.AUTH_COOKIE_MAX_AGE_DAYS) || 7;
  return days * 24 * 60 * 60 * 1000;
};

const getCookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  path: '/',
  maxAge: getCookieMaxAge(),
});

const setAuthCookie = (res, token) => {
  res.cookie(cookieName, token, getCookieOptions());
};

const clearAuthCookie = (res) => {
  res.clearCookie(cookieName, {
    ...getCookieOptions(),
    maxAge: undefined,
  });
};

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
    } else {
      await sendEmail(result.recipient, otp, result.expiresIn);
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
    setAuthCookie(res, token);
    sendSuccess(res, { user, sessionId: session._id }, 'Login successful');
  } catch (err) {
    sendError(res, err.message, err.statusCode || 500);
  }
};

const logout = async (req, res) => {
  try {
    await _logout({ token: req.accessToken });
    clearAuthCookie(res);
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
