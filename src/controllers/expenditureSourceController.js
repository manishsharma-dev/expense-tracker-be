const {sendCreated, sendSuccess, sendBadRequest, sendError} = require('../utils/apiResponse');
const { validationResult } = require('express-validator');
const { createSource: _create, getAllSources: _getAll, getSourceById: _getById, updateSourceById: _updateById } = require('../services/expenditureSourceService');

const createSource = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return sendBadRequest(res, 'Validation failed', errors.array());

    const source = await _create(req.body);
    sendCreated(res, { source }, 'Source created successfully');
  } catch (err) {
    sendError(res, err.message, err.statusCode || 500);
  }
};

const getAllSources = async (req, res) => {
  try {
    const sources = await _getAll();
    sendSuccess(res, { sources }, 'Sources fetched successfully');
  }
  catch (err) {
    sendError(res, err.message, err.statusCode || 500);
  }
};

const getSourceById = async (req, res) => {
  try {
    const source = await _getById(req.params.id);
    sendSuccess(res, { source }, 'Source fetched successfully');
  }
    catch (err) {
    sendError(res, err.message, err.statusCode || 500);
    }
};

const updateSource = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return sendBadRequest(res, 'Validation failed', errors.array());
    const source = await _updateById(req.params.id, req.body);
    sendSuccess(res, { source }, 'Source updated successfully');
  } catch (err) {
    sendError(res, err.message, err.statusCode || 500);
  }
};

module.exports = { createSource, getAllSources, getSourceById, updateSource };