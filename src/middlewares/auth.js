const jwt = require('jsonwebtoken');
const User = require('../models/User');
const LoginSession = require('../models/LoginSession');
const { hashToken } = require('../services/authService');
const { sendUnauthorized, sendForbidden } = require('../utils/apiResponse');

const cookieName = process.env.AUTH_COOKIE_NAME || 'access_token';

const getCookieValue = (cookieHeader = '', name) => {
  const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));
  return match?.[1] ? decodeURIComponent(match[1]) : null;
};

const protect = async (req, res, next) => {
  const cookieToken = getCookieValue(req.headers.cookie, cookieName);
  const token = cookieToken;

  if (!token) {
    return sendUnauthorized(res, 'No token provided');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).populate('country');
    if (!user || !user.isActive) return sendUnauthorized(res, 'Invalid or expired token');
    const session = await LoginSession.findOne({
      user: user._id,
      accessTokenHash: hashToken(token),
      isActive: true,
    });
    if (!session) return sendUnauthorized(res, 'Session expired');
    req.user = user;
    req.session = session;
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
