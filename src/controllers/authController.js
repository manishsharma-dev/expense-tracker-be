const { validationResult } = require('express-validator');
const { register: _register, login: _login } = require('../services/authService');
const { sendCreated, sendSuccess, sendBadRequest, sendError } = require('../utils/apiResponse');

const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return sendBadRequest(res, 'Validation failed', errors.array());

  try {
    const { user, token } = await _register(req.body);
    sendCreated(res, { user, token }, 'Registration successful');
  } catch (err) {
    sendError(res, err.message, err.statusCode || 500);
  }
};

const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return sendBadRequest(res, 'Validation failed', errors.array());

  try {
    const { user, token } = await _login(req.body);
    sendSuccess(res, { user, token }, 'Login successful');
  } catch (err) {
    sendError(res, err.message, err.statusCode || 500);
  }
};

const getMe = (req, res) => sendSuccess(res, { user: req.user }, 'Profile fetched');

module.exports = { register, login, getMe };
