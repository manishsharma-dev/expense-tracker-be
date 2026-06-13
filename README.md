# Xpense Backend

Backend API for the Xpense expense tracker.

## Stack

- Node.js + Express
- MongoDB + Mongoose
- OTP login with HttpOnly JWT cookie
- Redis OTP cache
- Nodemailer SMTP with Brevo
- S3 receipt storage
- Helmet, CORS, CSRF protection, rate limiting
- Jest + Supertest

## Local Development

```bash
npm install
cp .env.example .env
npm run dev
```

Health check:

```text
GET /api/v1/health
```

## Key Endpoints

### Auth

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| POST | `/api/v1/auth/register` | Public | Register user |
| POST | `/api/v1/auth/otp/request` | Public | Request email or phone OTP |
| POST | `/api/v1/auth/otp/verify` | Public | Verify OTP and set auth cookie |
| GET | `/api/v1/auth/csrf-token` | Private | Issue CSRF token |
| GET | `/api/v1/auth/me` | Private | Get current user |
| POST | `/api/v1/auth/logout` | Private | Logout and clear cookies |

### App

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| GET | `/api/v1/dashboard` | Private | Dashboard summary |
| GET/POST | `/api/v1/expenses` | Private | List or create expenses |
| GET/PUT | `/api/v1/expenses/:id` | Private | Read or update one expense |
| GET | `/api/v1/expenses/:id/receipt` | Private | Stream receipt from S3 |
| GET/POST | `/api/v1/earnings` | Private | List or create earnings |
| GET/PUT | `/api/v1/budgets` | Private | Read or update budget |
| GET/POST | `/api/v1/categories` | Private | Expense categories |
| GET/POST | `/api/v1/sub-categories` | Private | Expense sub categories |
| GET/POST | `/api/v1/payment-methods` | Private | User payment methods |
| GET | `/api/v1/payment-providers` | Private | Common providers |
| GET | `/api/v1/countries` | Private | Countries |
| GET | `/api/v1/countries/unique-currencies` | Private | Unique currency list |

## Environment Variables

```env
NODE_ENV=development
PORT=3000
MONGODB_URI=
JWT_SECRET=
JWT_EXPIRES_IN=7d

CORS_ORIGIN=http://localhost:4200,https://expense-tracker-fe-o0wf.onrender.com
AUTH_COOKIE_NAME=access_token
AUTH_COOKIE_MAX_AGE_DAYS=7
CSRF_COOKIE_NAME=csrf_token

RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100

AUTH_OTP_TTL_SECONDS=300
REDIS_URL=

TWILIO_SID=
TWILIO_TOKEN=
TWILIO_PHONE=

MAIL_HOST=smtp-relay.brevo.com
SMTP_PORT=587
SMTP_EMAIL=your-brevo-smtp-login
SMTP_PASSWORD=your-brevo-smtp-key
MAIL_SECURE=false
SMTP_FROM_NAME=Xpense
SMTP_FROM_EMAIL=verified-sender@example.com

AWS_REGION=ap-south-1
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_S3_BUCKET=
AWS_S3_PREFIX=receipts
AWS_S3_PUBLIC_BASE_URL=
```

## Brevo Email Setup

1. In Brevo, open `SMTP & API`.
2. Go to the `SMTP` tab.
3. Copy the SMTP login into `SMTP_EMAIL`.
4. Generate an SMTP key and put the full value in `SMTP_PASSWORD`.
5. Verify a sender email in Brevo.
6. Use that verified sender as `SMTP_FROM_EMAIL`.

Use:

```env
MAIL_HOST=smtp-relay.brevo.com
SMTP_PORT=587
MAIL_SECURE=false
```

`SMTP_PASSWORD` is the Brevo SMTP key, not your Brevo account password. The legacy `PASSWORD` env is still supported as a fallback by the code, but `SMTP_PASSWORD` is preferred.

## Cookie Auth And CSRF

Private routes use an HttpOnly auth cookie set by:

```text
POST /api/v1/auth/otp/verify
```

Unsafe authenticated requests require a CSRF token:

```text
POST, PUT, PATCH, DELETE
```

The frontend gets a token from:

```text
GET /api/v1/auth/csrf-token
```

Then sends:

```http
X-CSRF-Token: <token>
```

Do not use `*` for `CORS_ORIGIN` with cookie authentication.

## Render Notes

Set `CORS_ORIGIN` to the deployed frontend origin:

```env
CORS_ORIGIN=https://expense-tracker-fe-o0wf.onrender.com
```

The frontend currently proxies browser API calls through its SSR server, so browser requests go to `/api/v1/...` on the frontend origin and are forwarded to this backend.

## Scripts

```bash
npm start
npm run dev
npm test
```
