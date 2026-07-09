const { sendCreated, sendSuccess, sendError } = require('../utils/apiResponse');
const {
  createDebtAccount: _createDebtAccount,
  getDebtAccounts: _getDebtAccounts,
  getDebtAccountById: _getDebtAccountById,
  getDebtHistory: _getDebtHistory,
  getDebtTransactions: _getDebtTransactions,
  recordDebtTransaction: _recordDebtTransaction,
} = require('../services/debtService');

const getDebtAccounts = async (req, res) => {
  try {
    const result = await _getDebtAccounts(req.user._id);
    sendSuccess(res, result, 'Debt accounts fetched successfully');
  } catch (err) {
    sendError(res, err.message, err.statusCode || 500);
  }
};

const createDebtAccount = async (req, res) => {
  try {
    const account = await _createDebtAccount(req.body, req.user._id);
    sendCreated(res, { account }, 'Debt account created successfully');
  } catch (err) {
    sendError(res, err.message, err.statusCode || 500);
  }
};

const getDebtAccountById = async (req, res) => {
  try {
    const [account, transactions] = await Promise.all([
      _getDebtAccountById(req.params.id, req.user._id),
      _getDebtTransactions(req.params.id, req.user._id),
    ]);
    sendSuccess(res, { account, transactions }, 'Debt account fetched successfully');
  } catch (err) {
    sendError(res, err.message, err.statusCode || 500);
  }
};

const getDebtHistory = async (req, res) => {
  try {
    const result = await _getDebtHistory(req.params.id, req.user._id, req.query);
    sendSuccess(res, result, 'Debt history fetched successfully');
  } catch (err) {
    sendError(res, err.message, err.statusCode || 500);
  }
};

const recordDebtPayment = async (req, res) => {
  try {
    const transaction = await _recordDebtTransaction(req.params.id, {
      ...req.body,
      type: 'payment',
      direction: 'decrease',
    }, req.user._id);
    const account = await _getDebtAccountById(req.params.id, req.user._id);
    sendSuccess(res, { account, transaction }, 'Debt payment recorded successfully');
  } catch (err) {
    sendError(res, err.message, err.statusCode || 500);
  }
};

const recordDebtCharge = async (req, res) => {
  try {
    const transaction = await _recordDebtTransaction(req.params.id, {
      ...req.body,
      type: req.body.type || 'charge',
      direction: 'increase',
    }, req.user._id);
    const account = await _getDebtAccountById(req.params.id, req.user._id);
    sendSuccess(res, { account, transaction }, 'Debt charge recorded successfully');
  } catch (err) {
    sendError(res, err.message, err.statusCode || 500);
  }
};

module.exports = {
  createDebtAccount,
  getDebtAccounts,
  getDebtAccountById,
  getDebtHistory,
  recordDebtCharge,
  recordDebtPayment,
};
