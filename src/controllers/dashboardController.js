const { sendSuccess, sendError } = require('../utils/apiResponse');
const { getDashboardData: _getDashboardData } = require('../services/dashboardService');

const getDashboardData = async (req, res) => {
  try {
    const dashboard = await _getDashboardData(req.user, { month: req.query.month });
    sendSuccess(res, { dashboard }, 'Dashboard data fetched successfully');
  } catch (err) {
    sendError(res, err.message, err.statusCode || 500);
  }
};

module.exports = {
  getDashboardData,
};
