# Xpense Backend

Node.js backend for **Xpense**, a personal finance tracker. The backend provides the API, authentication, receipt storage/OCR, and can also serve the built Angular frontend from `public`.

## What The Backend Does

- OTP login and registration using email or phone.
- HttpOnly cookie authentication.
- CSRF protection for unsafe authenticated requests.
- User profile and preferences.
- Expense CRUD with user ownership checks.
- Receipt upload to S3 and protected receipt viewing.
- Receipt/payment screenshot OCR using Tesseract.
- Review-safe receipt scan output with field confidence, source lines, and alternatives.
- Merchant rules that learn category/payment defaults from prior expenses.
- Categories, subcategories, payment providers, and user payment methods.
- Earnings and earning categories.
- Budgets with total and category-level allocation.
- Debt accounts, charges, and payments.
- Dashboard summary API using expenses, earnings, budgets, and categories.
- Countries and unique currency APIs for currency dropdowns.
- Rate limiting with detailed 429 logging.
- Helmet, CORS, Morgan, Winston logging.

## Recommended Deployment Shape

The most reliable production setup is **single-origin**:

```text
https://your-app.example.com/          Angular frontend served by this backend
https://your-app.example.com/api/v1    Backend API
```

Why this matters: authentication uses HttpOnly cookies. Serving the Angular app and API from the same origin avoids mobile browser issues with cross-site cookies on free Render subdomains.

Build the frontend into the backend before deployment:

```bash
cd ../expense-tracker-fe
npm run build:be-public
```

Then deploy/start this backend service.

## Stack

- Node.js + Express
- MongoDB + Mongoose
- Redis for OTP cache
- Nodemailer/Brevo for email OTP
- Twilio-ready phone OTP support
- AWS S3 for receipts
- Tesseract.js for receipt OCR
- JWT in HttpOnly cookies
- CSRF protection
- Helmet + CORS
- Express rate limiting
- Winston logging
- Jest + Supertest

## Local Development

Install dependencies:

```bash
npm install
```

Create an env file:

```bash
cp .env.example .env
```

Start the API:

```bash
npm run dev
```

Health check:

```text
GET http://localhost:3000/api/v1/health
```

If `public/index.html` exists, the backend also serves the Angular app:

```text
http://localhost:3000
```

## API Overview

All private routes require the auth cookie. Unsafe private requests also require CSRF protection.

### Auth

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| POST | `/api/v1/auth/register` | Public | Register user |
| POST | `/api/v1/auth/otp/request` | Public | Request OTP by email or phone |
| POST | `/api/v1/auth/otp/verify` | Public | Verify OTP and set auth cookie |
| GET | `/api/v1/auth/csrf-token` | Private | Issue CSRF token |
| GET | `/api/v1/auth/me` | Private | Get current user |
| POST | `/api/v1/auth/logout` | Private | Logout and clear cookies |

### User

| Method | Endpoint | Description |
| --- | --- | --- |
| PATCH | `/api/v1/users/me` | Update profile and preferences |
| POST | `/api/v1/users/me/profile-reminder/later` | Postpone profile reminder |

### Expenses

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/v1/expenses` | List expenses with pagination, filters, sorting, and totals |
| POST | `/api/v1/expenses` | Create expense, optionally with receipt |
| GET | `/api/v1/expenses/:id` | Get one expense owned by the current user |
| PUT | `/api/v1/expenses/:id` | Update one expense owned by the current user |
| DELETE | `/api/v1/expenses/:id` | Delete one expense owned by the current user |
| GET | `/api/v1/expenses/:id/receipt` | Stream receipt from S3 for the owning user |
| POST | `/api/v1/expenses/receipt/scan` | Scan receipt/payment screenshot and return review-safe suggestions |

### Smart Defaults

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/v1/merchant-rules/suggestions` | Suggest category/subcategory/payment method from learned merchant rules |

### Money Management

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/v1/dashboard` | Dashboard data |
| GET/POST | `/api/v1/earnings` | List or create earnings |
| GET/POST | `/api/v1/earnings/categories` | Earning categories |
| GET/PUT | `/api/v1/budgets` | Read or update budget |
| GET/POST | `/api/v1/debts` | Debt accounts |
| POST | `/api/v1/debts/:id/charges` | Add debt charge |
| POST | `/api/v1/debts/:id/payments` | Record debt payment |

### Reference Data

| Method | Endpoint | Description |
| --- | --- | --- |
| GET/POST | `/api/v1/categories` | Expense categories |
| GET/POST | `/api/v1/sub-categories` | Expense subcategories |
| GET/POST | `/api/v1/payment-methods` | User payment methods |
| PUT | `/api/v1/payment-methods/sequence` | Reorder payment methods |
| GET | `/api/v1/payment-providers` | Common banks/apps/wallet providers |
| GET | `/api/v1/countries` | Countries |
| GET | `/api/v1/countries/unique-currencies` | Unique currency list |

## Receipt OCR

Receipt scanning is intentionally conservative.

The scan endpoint returns old top-level convenience fields plus a safer `fields` object:

```json
{
  "description": "Traveni",
  "amount": 135,
  "date": "2025-10-14",
  "paymentMethod": null,
  "fields": {
    "amount": {
      "value": 135,
      "confidence": "high",
      "source": "Rupees One Hundred Thirty Five Only",
      "alternatives": []
    }
  }
}
```

The frontend only auto-applies high-confidence fields by default. Medium/low confidence values are shown for review.

## Environment Variables

```env
NODE_ENV=development
PORT=3000
MONGODB_URI=
JWT_SECRET=
JWT_EXPIRES_IN=7d

CORS_ORIGIN=http://localhost:4000,http://localhost:4200
AUTH_COOKIE_NAME=access_token
AUTH_COOKIE_MAX_AGE_DAYS=7
CSRF_COOKIE_NAME=csrf_token

RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=1000
AUTH_RATE_LIMIT_WINDOW_MS=600000
AUTH_RATE_LIMIT_MAX=10

AUTH_OTP_TTL_SECONDS=300
REDIS_URL=

TWILIO_SID=
TWILIO_TOKEN=
TWILIO_PHONE=

MAIL_HOST=smtp-relay.brevo.com
SMTP_PORT=587
SMTP_EMAIL=your-brevo-smtp-login
SMTP_PASSWORD=your-brevo-smtp-key
BREVO_API_KEY=your-brevo-api-key
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

## Email Setup

Brevo is supported for email OTP.

Recommended hosted setup:

1. In Brevo, open `SMTP & API`.
2. Create an API key.
3. Set `BREVO_API_KEY`.
4. Verify a sender email in Brevo.
5. Set `SMTP_FROM_EMAIL` to that verified sender.

SMTP fallback is available with:

```env
MAIL_HOST=smtp-relay.brevo.com
SMTP_PORT=587
MAIL_SECURE=false
SMTP_EMAIL=your-brevo-smtp-login
SMTP_PASSWORD=your-brevo-smtp-key
```

On some free hosting tiers, SMTP ports may time out. Prefer Brevo API when available.

## Cookie Auth And CSRF

Login sets an HttpOnly auth cookie:

```text
POST /api/v1/auth/otp/verify
```

Unsafe private requests require CSRF:

```text
POST, PUT, PATCH, DELETE
```

The frontend fetches a CSRF token from:

```text
GET /api/v1/auth/csrf-token
```

Then sends:

```http
X-CSRF-Token: <token>
```

Do not use `*` for `CORS_ORIGIN` with cookie authentication.

## Scripts

```bash
npm start     # run src/app.js
npm run dev   # run with nodemon
npm test      # jest coverage
```

## Notes For First-Time Contributors

- User ownership is enforced in services for user-owned data like expenses and payment methods.
- Receipt files are uploaded to S3 only when the frontend includes the file in the expense request.
- The scan endpoint does not save a receipt by itself.
- The backend serves the Angular app from `public` when the frontend has been copied there.
- Keep generated frontend build output separate from source changes unless you are preparing a backend-served deployment.
