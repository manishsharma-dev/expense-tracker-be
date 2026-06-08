const { sendSuccess, sendError } = require('../utils/apiResponse');
const {
  getBudget: _getBudget,
  upsertBudget: _upsertBudget,
} = require('../services/budgetService');

const getBudget = async (req, res) => {
  try {
    const budget = await _getBudget(req.user._id, req.query.month);
    sendSuccess(res, { budget }, 'Budget fetched successfully');
  } catch (err) {
    sendError(res, err.message, err.statusCode || 500);
  }
};

const upsertBudget = async (req, res) => {
  try {
    const budget = await _upsertBudget(req.body, req.user._id);
    sendSuccess(res, { budget }, 'Budget saved successfully');
  } catch (err) {
    sendError(res, err.message, err.statusCode || 500);
  }
};

module.exports = {
  getBudget,
  upsertBudget,
};
