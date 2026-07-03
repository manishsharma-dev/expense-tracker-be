const { sendCreated, sendSuccess, sendBadRequest, sendError } = require('../utils/apiResponse');
const { validationResult } = require('express-validator');
const {createExpense:_create, deleteExpense: _deleteById, getAllExpenses: __getAll, getExpenseById: _getById,getExpenseByFilter: _getByFilter, updateExpense: _updateById } = require('../services/expenseService');
const { normalizeCalendarDate } = require('../utils/dateUtils');
const { getReceiptFromS3, uploadReceiptToS3 } = require('../services/s3StorageService');
const { scanReceipt: _scanReceipt } = require('../services/receiptOcrService');

const getReceiptViewUrl = (req, expenseId) => `${req.protocol}://${req.get('host')}${req.baseUrl}/${expenseId}/receipt`;

const attachReceiptViewUrl = (req, expense) => {
  if (!expense) return expense;
  const payload = typeof expense.toObject === 'function' ? expense.toObject() : { ...expense };
  if (payload.receipt?.key) {
    payload.receipt.viewUrl = getReceiptViewUrl(req, payload._id);
  }
  return payload;
};

const hasOwn = (body, key) => Object.prototype.hasOwnProperty.call(body, key);

const normalizeExpensePayload = (body) => ({
  amount: body.amount !== undefined ? Number(body.amount) : undefined,
  date: normalizeCalendarDate(body.date),
  category: body.category,
  subCategory: hasOwn(body, 'subCategory') ? body.subCategory || null : undefined,
  paymentMethod: body.paymentMethod,
  country: hasOwn(body, 'country') ? body.country || null : undefined,
  description: body.description,
  notes: hasOwn(body, 'notes') ? body.notes || '' : undefined,
});

const createExpense = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return sendBadRequest(res, 'Validation failed', errors.array());

    const receipt = await uploadReceiptToS3(req.file, req.user._id);
    const expense = await _create(normalizeExpensePayload(req.body), req.user._id, receipt);
    sendCreated(res, { expense }, 'Expense created successfully');
  } catch (err) {
    sendError(res, err.message, err.statusCode || 500);
  }
};

const getAllExpenses = async (req, res) => {
    try {
        const result = await __getAll(req.user._id, {
            page: req.query.page,
            limit: req.query.limit,
            search: req.query.search,
            sortBy: req.query.sortBy,
            sortOrder: req.query.sortOrder,
            category: req.query.category,
            subCategory: req.query.subCategory,
            paymentMethod: req.query.paymentMethod,
            country: req.query.country,
            startDate: req.query.startDate,
            endDate: req.query.endDate,
        });
        sendSuccess(res, {
            ...result,
            expenses: result.expenses.map((expense) => attachReceiptViewUrl(req, expense)),
        }, 'Expenses retrieved successfully');
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
        if (req.query.paymentMethod) filter.paymentMethod = req.query.paymentMethod;
        if (req.query.startDate || req.query.endDate) {
          filter.date = {};
          if (req.query.startDate) filter.date.$gte = new Date(req.query.startDate);
          if (req.query.endDate) filter.date.$lte = new Date(req.query.endDate);
        }
        const expenses = await _getByFilter(filter, req.user._id);
        sendSuccess(res, {
            expenses: expenses.map((expense) => attachReceiptViewUrl(req, expense)),
        }, 'Expenses retrieved successfully');
    } catch (err) {
        sendError(res, err.message, err.statusCode || 500);
    }
};

const getExpenseById = async (req, res) => {
    try {
        const expense = await _getById(req.params.id, req.user._id);
        sendSuccess(res, { expense: attachReceiptViewUrl(req, expense) }, 'Expense retrieved successfully');
    } catch (err) {
        sendError(res, err.message, err.statusCode || 500);
    }
};

const updateExpense = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return sendBadRequest(res, 'Validation failed', errors.array());
        const updates = normalizeExpensePayload(req.body);
        Object.keys(updates).forEach((key) => updates[key] === undefined && delete updates[key]);
        const receipt = await uploadReceiptToS3(req.file, req.user._id);
        if (receipt) updates.receipt = receipt;
        const expense = await _updateById(req.params.id, updates, req.user._id);
        sendSuccess(res, { expense }, 'Expense updated successfully');
    } catch (err) {
        sendError(res, err.message, err.statusCode || 500);
    }
};

const scanReceipt = async (req, res) => {
    try {
        const scan = await _scanReceipt(req.file, req.user._id);
        sendSuccess(res, { scan }, 'Receipt scanned successfully');
    } catch (err) {
        sendError(res, err.message, err.statusCode || 500);
    }
};

const deleteExpense = async (req, res) => {
    try {
        await _deleteById(req.params.id, req.user._id);
        sendSuccess(res, null, 'Expense deleted successfully');
    } catch (err) {
        sendError(res, err.message, err.statusCode || 500);
    }
};

const getReceipt = async (req, res) => {
    try {
        const expense = await _getById(req.params.id, req.user._id);
        if (!expense.receipt?.key) {
            return sendBadRequest(res, 'Receipt not found');
        }

        const object = await getReceiptFromS3(expense.receipt);
        res.removeHeader('X-Frame-Options');
        res.removeHeader('Content-Security-Policy');
        res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
        res.setHeader('Content-Type', object.ContentType || expense.receipt.mimeType || 'application/octet-stream');
        res.setHeader('Content-Disposition', `inline; filename="${encodeURIComponent(expense.receipt.originalName || 'receipt')}"`);
        if (object.ContentLength) res.setHeader('Content-Length', object.ContentLength);
        object.Body.pipe(res);
    } catch (err) {
        sendError(res, err.message, err.statusCode || 500);
    }
};

module.exports = { createExpense, deleteExpense, getAllExpenses, getExpenses, getExpenseById, getReceipt, scanReceipt, updateExpense };
