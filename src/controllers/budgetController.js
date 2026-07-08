const { sendSuccess, sendError } = require('../utils/apiResponse');
const {
  getBudget: _getBudget,
  upsertBudget: _upsertBudget,
} = require('../services/budgetService');

const getBudget = async (req, res) => {
  try {
    const budget = await _getBudget(req.user, req.query.month);
    sendSuccess(res, { budget }, 'Budget fetched successfully');
  } catch (err) {
    sendError(res, err.message, err.statusCode || 500);
  }
};

const upsertBudget = async (req, res) => {
  try {
    const budget = await _upsertBudget(req.body, req.user);
    sendSuccess(res, { budget }, 'Budget saved successfully');
  } catch (err) {
    sendError(res, err.message, err.statusCode || 500);
  }
};

module.exports = {
  getBudget,
  upsertBudget,
};
