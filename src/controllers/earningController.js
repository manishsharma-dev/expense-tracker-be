const { sendCreated, sendSuccess, sendError } = require('../utils/apiResponse');
const {
  getCategories: _getCategories,
  createCategory: _createCategory,
  getEarnings: _getEarnings,
  createEarning: _createEarning,
} = require('../services/earningService');

const getCategories = async (req, res) => {
  try {
    const earningCategories = await _getCategories(req.user._id);
    sendSuccess(res, { earningCategories }, 'Earning categories fetched successfully');
  } catch (err) {
    sendError(res, err.message, err.statusCode || 500);
  }
};

const createCategory = async (req, res) => {
  try {
    const earningCategory = await _createCategory(req.body, req.user._id);
    sendCreated(res, { earningCategory }, 'Earning category created successfully');
  } catch (err) {
    sendError(res, err.message, err.statusCode || 500);
  }
};

const getEarnings = async (req, res) => {
  try {
    const earnings = await _getEarnings(req.user._id, req.query);
    sendSuccess(res, { earnings }, 'Earnings fetched successfully');
  } catch (err) {
    sendError(res, err.message, err.statusCode || 500);
  }
};

const createEarning = async (req, res) => {
  try {
    const earning = await _createEarning(req.body, req.user._id);
    sendCreated(res, { earning }, 'Earning created successfully');
  } catch (err) {
    sendError(res, err.message, err.statusCode || 500);
  }
};

module.exports = {
  getCategories,
  createCategory,
  getEarnings,
  createEarning,
};
