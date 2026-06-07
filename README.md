# Expense Tracker API

Backend API for the Expense Tracker app.

## Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB + Mongoose
- **Auth**: OTP login + JWT
- **Email**: Nodemailer SMTP
- **Validation**: express-validator
- **Logging**: Winston + Morgan
- **Security**: Helmet, CORS, rate-limiting
- **Testing**: Jest + Supertest

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Edit .env with your values

# Run in development
npm run dev

# Run in production
npm start

# Run tests
npm test
```

## API Endpoints

### Auth
| Method | Endpoint              | Access  | Description     |
|--------|-----------------------|---------|-----------------|
| POST   | /api/v1/auth/register | Public  | Register user   |
| POST   | /api/v1/auth/otp/request | Public  | Request email/phone OTP |
| POST   | /api/v1/auth/otp/verify | Public  | Verify OTP and login |
| POST   | /api/v1/auth/logout | Private | Logout |
| GET    | /api/v1/auth/me       | Private | Get own profile |

### Users
| Method | Endpoint           | Access | Description      |
|--------|--------------------|--------|------------------|
| GET    | /api/v1/users      | Admin  | List all users   |
| GET    | /api/v1/users/:id  | Auth   | Get user by ID   |
| PATCH  | /api/v1/users/:id  | Auth   | Update user      |
| DELETE | /api/v1/users/:id  | Admin  | Delete user      |

### Countries
| Method | Endpoint                           | Access | Description |
|--------|------------------------------------|--------|-------------|
| GET    | /api/v1/countries                  | Auth   | List all active countries |
| GET    | /api/v1/countries/unique-currencies | Auth  | List one country per unique currency |

### Payment Providers
| Method | Endpoint                  | Access | Description |
|--------|---------------------------|--------|-------------|
| GET    | /api/v1/payment-providers | Auth   | List bank/app/wallet/cash providers |

### Health
| Method | Endpoint        | Access | Description |
|--------|-----------------|--------|-------------|
| GET    | /api/v1/health  | Public | Health check |

## Folder Structure

```
src/
├── config/         # DB connection and env config
├── controllers/    # Route handlers (thin layer)
├── middlewares/    # Auth, validation, error handling
├── models/         # Mongoose schemas
├── routes/         # Express routers
├── services/       # Business logic
└── utils/          # Logger, API response helpers
tests/              # Jest + Supertest tests
```

## Environment Variables

| Variable              | Description                    | Default     |
|-----------------------|--------------------------------|-------------|
| NODE_ENV              | Environment                    | development |
| PORT                  | Server port                    | 3000        |
| MONGODB_URI           | MongoDB connection string       | —           |
| JWT_SECRET            | JWT signing secret             | —           |
| JWT_EXPIRES_IN        | JWT expiry duration            | 7d          |
| RATE_LIMIT_WINDOW_MS  | Rate limit window (ms)         | 900000      |
| RATE_LIMIT_MAX        | Max requests per window        | 100         |
| AUTH_OTP_TTL_SECONDS  | OTP expiry in seconds          | 300         |
| REDIS_URL             | Redis connection string for OTP cache | — |
| MAIL_HOST             | SMTP host for Nodemailer       | — |
| SMTP_PORT             | SMTP port                      | 587          |
| SMTP_EMAIL            | SMTP username/email            | — |
| PASSWORD              | SMTP password or app password  | — |
| MAIL_FROM             | From address shown in emails   | SMTP_EMAIL  |
| MAIL_SECURE           | Use TLS from connection start  | false       |

## Email OTP Setup

Email OTP uses Nodemailer with SMTP. The current default setup uses Mailtrap sandbox SMTP for testing.

```env
MAIL_HOST=sandbox.smtp.mailtrap.io
SMTP_PORT=2525
SMTP_EMAIL=your-mailtrap-username
PASSWORD=your-mailtrap-password
SMTP_FROM_NAME=NoReply
SMTP_FROM_EMAIL=noreply@example.com
```

Mailtrap sandbox captures emails in your Mailtrap inbox. It does not deliver emails to the recipient's real inbox.
