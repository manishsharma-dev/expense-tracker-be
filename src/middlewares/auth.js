const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { sendUnauthorized, sendForbidden } = require('../utils/apiResponse');

const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return sendUnauthorized(res, 'No token provided');
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).populate('country');
    if (!user || !user.isActive) return sendUnauthorized(res, 'Invalid or expired token');
    req.user = user;
    req.accessToken = token;
    next();
  } catch {
    sendUnauthorized(res, 'Invalid or expired token');
  }
};

const restrictTo = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return sendForbidden(res, 'You do not have permission to perform this action');
  }
  next();
};

module.exports = { protect, restrictTo };
