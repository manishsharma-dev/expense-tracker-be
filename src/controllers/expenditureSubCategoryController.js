const { sendCreated, sendSuccess, sendBadRequest, sendError } = require('../utils/apiResponse');
const { validationResult } = require('express-validator');
const { createSubCategory: _create, getAllSubCategories: _getAll, getSubCategoryById: _getById,getSubCategoriesByCategoryId: _getbyCategoryId, updateSubCategoryById: _updateById } = require('../services/expenditureSubCategoryService');

const createSubCategory = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return sendBadRequest(res, 'Validation failed', errors.array());

    const subCategory = await _create(req.body);
    sendCreated(res, { subCategory }, 'Sub Category created successfully');
  } catch (err) {
    sendError(res, err.message, err.statusCode || 500);
  }
};
const getSubCategories = async (req, res) => {
  try {
    const subCategories = await _getAll();
    sendSuccess(res, { subCategories }, 'Sub Categories fetched successfully');
    }
    catch (err) {
        sendError(res, err.message, err.statusCode || 500);
    }
};

const getSubCategoryById = async (req, res) => {
  try {
    const subCategory = await _getById(req.params.id);
    sendSuccess(res, { subCategory }, 'Sub Category fetched successfully');
    }
    catch (err) {
        sendError(res, err.message, err.statusCode || 500);
    }
};

const getSubCategoriesByCategoryId = async (req, res) => {
  try {
    const subCategories = await _getbyCategoryId(req.params.categoryId);
    sendSuccess(res, { subCategories }, 'Sub Categories fetched successfully');
  } catch (err) {
    sendError(res, err.message, err.statusCode || 500);
  }
};

const updateSubCategory = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return sendBadRequest(res, 'Validation failed', errors.array());

    const subCategory = await _updateById(req.params.id, req.body);
    sendSuccess(res, { subCategory }, 'Sub Category updated successfully');
  } catch (err) {
    sendError(res, err.message, err.statusCode || 500);
  }
};

module.exports = { createSubCategory, getSubCategories, getSubCategoryById, getSubCategoriesByCategoryId, updateSubCategory };