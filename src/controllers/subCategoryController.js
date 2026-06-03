const { sendCreated, sendSuccess, sendError } = require('../utils/apiResponse');
const {
  createSubCategory: _create,
  getAllSubCategories: _getAll,
  getSubCategoryById: _getById,
  updateSubCategory: _updateById,
} = require('../services/subCategoryService');

const createSubCategory = async (req, res) => {
  try {
    const subCategory = await _create(req.body, req.user._id);
    sendCreated(res, { subCategory }, 'Sub category created successfully');
  } catch (err) {
    sendError(res, err.message, err.statusCode || 500);
  }
};

const getSubCategories = async (req, res) => {
  try {
    const subCategories = await _getAll(req.user._id, req.query.category);
    sendSuccess(res, { subCategories }, 'Sub categories fetched successfully');
  } catch (err) {
    sendError(res, err.message, err.statusCode || 500);
  }
};

const getSubCategoryById = async (req, res) => {
  try {
    const subCategory = await _getById(req.params.id, req.user._id);
    sendSuccess(res, { subCategory }, 'Sub category fetched successfully');
  } catch (err) {
    sendError(res, err.message, err.statusCode || 500);
  }
};

const updateSubCategory = async (req, res) => {
  try {
    const subCategory = await _updateById(req.params.id, req.body, req.user._id);
    sendSuccess(res, { subCategory }, 'Sub category updated successfully');
  } catch (err) {
    sendError(res, err.message, err.statusCode || 500);
  }
};

module.exports = { createSubCategory, getSubCategories, getSubCategoryById, updateSubCategory };
