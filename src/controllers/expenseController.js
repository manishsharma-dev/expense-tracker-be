const { sendCreated, sendSuccess, sendBadRequest, sendError } = require('../utils/apiResponse');
const { validationResult } = require('express-validator');
const {createExpense:_create, getAllExpenses: __getAll, getExpenseById: _getById,getExpenseByFilter: _getByFilter, updateExpense: _updateById } = require('../services/expenseService');

const createExpense = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return sendBadRequest(res, 'Validation failed', errors.array());

    const expense = await _create(req.body, req.user._id);
    sendCreated(res, { expense }, 'Expense created successfully');
  } catch (err) {
    sendError(res, err.message, err.statusCode || 500);
  }
};

const getAllExpenses = async (req, res) => {
    try {
        const expenses = await __getAll(req.user._id);
        sendSuccess(res, { expenses }, 'Expenses retrieved successfully');
    } catch (err) {
        sendError(res, err.message, err.statusCode || 500);
    }
};

const getExpenses = async (req, res) => {
    try {
        const filter = {};
        if (req.query.category) filter.category = req.query.category;
        if (req.query.minAmount) filter.amount = { ...filter.amount, $gte: parseFloat(req.query.minAmount) };
        if (req.query.maxAmount) filter.amount = { ...filter.amount, $lte: parseFloat(req.query.maxAmount) };
        if (req.query.source) filter.source = req.query.source;
        if (req.query.startDate || req.query.endDate) {
          filter.date = {};
          if (req.query.startDate) filter.date.$gte = new Date(req.query.startDate);
          if (req.query.endDate) filter.date.$lte = new Date(req.query.endDate);
        }
        const expenses = await _getByFilter(filter, req.user._id);
        sendSuccess(res, { expenses }, 'Expenses retrieved successfully');
    } catch (err) {
        sendError(res, err.message, err.statusCode || 500);
    }
};

const getExpenseById = async (req, res) => {
    try {
        const expense = await _getById(req.params.id, req.user._id);
        sendSuccess(res, { expense }, 'Expense retrieved successfully');
    } catch (err) {
        sendError(res, err.message, err.statusCode || 500);
    }
};

const updateExpense = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return sendBadRequest(res, 'Validation failed', errors.array());
        const expense = await _updateById(req.params.id, req.body, req.user._id);
        sendSuccess(res, { expense }, 'Expense updated successfully');
    } catch (err) {
        sendError(res, err.message, err.statusCode || 500);
    }
};

module.exports = { createExpense,getAllExpenses, getExpenses, getExpenseById, updateExpense };