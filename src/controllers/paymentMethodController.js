const { sendCreated, sendSuccess, sendError } = require('../utils/apiResponse');
const {
  createPaymentMethod: _create,
  getAllPaymentMethods: _getAll,
  getPaymentMethodById: _getById,
  updatePaymentMethod: _updateById,
} = require('../services/paymentMethodService');

const createPaymentMethod = async (req, res) => {
  try {
    const paymentMethod = await _create(req.body, req.user._id);
    sendCreated(res, { paymentMethod }, 'Payment method created successfully');
  } catch (err) {
    sendError(res, err.message, err.statusCode || 500);
  }
};

const getPaymentMethods = async (req, res) => {
  try {
    const paymentMethods = await _getAll(req.user._id);
    sendSuccess(res, { paymentMethods }, 'Payment methods fetched successfully');
  } catch (err) {
    sendError(res, err.message, err.statusCode || 500);
  }
};

const getPaymentMethodById = async (req, res) => {
  try {
    const paymentMethod = await _getById(req.params.id, req.user._id);
    sendSuccess(res, { paymentMethod }, 'Payment method fetched successfully');
  } catch (err) {
    sendError(res, err.message, err.statusCode || 500);
  }
};

const updatePaymentMethod = async (req, res) => {
  try {
    const paymentMethod = await _updateById(req.params.id, req.body, req.user._id);
    sendSuccess(res, { paymentMethod }, 'Payment method updated successfully');
  } catch (err) {
    sendError(res, err.message, err.statusCode || 500);
  }
};

module.exports = { createPaymentMethod, getPaymentMethods, getPaymentMethodById, updatePaymentMethod };
