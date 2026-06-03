const { sendSuccess, sendError } = require('../utils/apiResponse');
const { getAllCountries: _getAll } = require('../services/countryService');

const getCountries = async (_req, res) => {
  try {
    const countries = await _getAll();
    sendSuccess(res, { countries }, 'Countries fetched successfully');
  } catch (err) {
    sendError(res, err.message, err.statusCode || 500);
  }
};

module.exports = { getCountries };
