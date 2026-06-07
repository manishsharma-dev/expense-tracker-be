const { sendSuccess, sendError } = require('../utils/apiResponse');
const { getPaymentProviders: _getPaymentProviders } = require('../services/paymentProviderService');

const getPaymentProviders = async (_req, res) => {
  try {
    const paymentProviders = await _getPaymentProviders();
    sendSuccess(res, { paymentProviders }, 'Payment providers fetched successfully');
  } catch (err) {
    sendError(res, err.message, err.statusCode || 500);
  }
};

module.exports = { getPaymentProviders };
