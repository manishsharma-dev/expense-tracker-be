const { sendCreated, sendSuccess, sendError } = require('../utils/apiResponse');
const {
  createCategory: _create,
  getAllCategories: _getAll,
  getCategoryById: _getById,
  updateCategory: _updateById,
} = require('../services/categoryService');

const createCategory = async (req, res) => {
  try {
    const category = await _create(req.body, req.user._id);
    sendCreated(res, { category }, 'Category created successfully');
  } catch (err) {
    sendError(res, err.message, err.statusCode || 500);
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await _getAll(req.user._id);
    sendSuccess(res, { categories }, 'Categories fetched successfully');
  } catch (err) {
    sendError(res, err.message, err.statusCode || 500);
  }
};

const getCategoryById = async (req, res) => {
  try {
    const category = await _getById(req.params.id, req.user._id);
    sendSuccess(res, { category }, 'Category fetched successfully');
  } catch (err) {
    sendError(res, err.message, err.statusCode || 500);
  }
};

const updateCategory = async (req, res) => {
  try {
    const category = await _updateById(req.params.id, req.body, req.user._id);
    sendSuccess(res, { category }, 'Category updated successfully');
  } catch (err) {
    sendError(res, err.message, err.statusCode || 500);
  }
};

module.exports = { createCategory, getCategories, getCategoryById, updateCategory };
