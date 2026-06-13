const { sendForbidden } = require('../utils/apiResponse');
const { getCsrfCookie, getCsrfHeader } = require('../utils/csrf');

const safeMethods = new Set(['GET', 'HEAD', 'OPTIONS']);

const csrfProtection = (req, res, next) => {
  if (safeMethods.has(req.method)) return next();

  const cookieToken = getCsrfCookie(req);
  const headerToken = getCsrfHeader(req);

  if (!cookieToken || !headerToken || cookieToken !== headerToken) {
    return sendForbidden(res, 'Invalid CSRF token');
  }

  return next();
};

module.exports = { csrfProtection };
