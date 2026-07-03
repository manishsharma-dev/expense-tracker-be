const { sendError, sendSuccess } = require('../utils/apiResponse');
const { getMerchantRuleSuggestions } = require('../services/merchantRuleService');

const getSuggestions = async (req, res) => {
  try {
    const suggestions = await getMerchantRuleSuggestions(req.user._id, req.query.q || req.query.search || '');
    sendSuccess(res, { suggestions }, 'Merchant suggestions retrieved successfully');
  } catch (err) {
    sendError(res, err.message, err.statusCode || 500);
  }
};

module.exports = { getSuggestions };
