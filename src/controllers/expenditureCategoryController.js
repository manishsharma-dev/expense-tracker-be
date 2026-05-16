const { sendCreated, sendSuccess, sendBadRequest, sendError } = require('../utils/apiResponse');
const { validationResult } = require('express-validator');
const {createCategory: _create, getAllCategories: _getAll, getCategoryById: _getById} = require('../services/expenditureCategoryService');

const createCategory = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return sendBadRequest(res, 'Validation failed', errors.array());

    const category = await _create(req.user._id, req.body);
    sendCreated(res, { category }, 'Category created successfully');
  } catch (err) {
    sendError(res, err.message, err.statusCode || 500);
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await _getAll();
    sendSuccess(res, { categories }, 'Categories fetched successfully');
  }
  catch (err) {
    sendError(res, err.message, err.statusCode || 500);
  }
};

const getCategoryById = async (req, res) => {
  try {
    const category = await _getById(req.user._id, req.params.id);
    sendSuccess(res, { category }, 'Category fetched successfully');
  }
  catch (err) {
    sendError(res, err.message, err.statusCode || 500);
  }
};

const updateCategory = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return sendBadRequest(res, 'Validation failed', errors.array());

    const category = await _updateById(req.user._id, req.params.id, req.body);
    sendSuccess(res, { category }, 'Category updated successfully');
  }
  catch (err) {
    sendError(res, err.message, err.statusCode || 500);
  }
};

module.exports = { createCategory, getCategories, getCategoryById, updateCategory };