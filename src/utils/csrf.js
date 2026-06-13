const crypto = require('crypto');

const csrfCookieName = process.env.CSRF_COOKIE_NAME || 'csrf_token';
const csrfHeaderName = 'x-csrf-token';

const getCookieValue = (cookieHeader = '', name) => {
  const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));
  return match?.[1] ? decodeURIComponent(match[1]) : null;
};

const createCsrfToken = () => crypto.randomBytes(32).toString('hex');

const getCsrfCookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  path: '/',
});

const setCsrfCookie = (res, token) => {
  res.cookie(csrfCookieName, token, getCsrfCookieOptions());
};

const clearCsrfCookie = (res) => {
  res.clearCookie(csrfCookieName, getCsrfCookieOptions());
};

const getCsrfCookie = (req) => getCookieValue(req.headers.cookie, csrfCookieName);

const getCsrfHeader = (req) => req.get(csrfHeaderName);

module.exports = {
  clearCsrfCookie,
  createCsrfToken,
  csrfCookieName,
  csrfHeaderName,
  getCsrfCookie,
  getCsrfHeader,
  setCsrfCookie,
};
