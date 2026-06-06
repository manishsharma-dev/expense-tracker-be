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

Email OTP uses Nodemailer with SMTP:

```js
createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.MAIL_SECURE === 'true',
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.PASSWORD
  }
});
```

Common provider values:

| Provider | MAIL_HOST | SMTP_PORT | MAIL_SECURE | Notes |
|----------|-----------|-----------|-------------|-------|
| Gmail | smtp.gmail.com | 587 | false | Use a Google App Password, not your normal password |
| Gmail SSL | smtp.gmail.com | 465 | true | Use a Google App Password |
| Outlook / Microsoft 365 | smtp.office365.com | 587 | false | SMTP AUTH must be enabled |
| SendGrid | smtp.sendgrid.net | 587 | false | User is `apikey`, password is your SendGrid API key |
| Mailgun | smtp.mailgun.org | 587 | false | Use SMTP credentials from Mailgun dashboard |

For Gmail:
1. Enable 2-Step Verification on your Google account.
2. Go to Google Account -> Security -> App passwords.
3. Create an app password for Mail.
4. Use the generated 16-character app password in `.env`. Remove spaces from the copied app password if Google shows it grouped.
5. Use:

```env
MAIL_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_EMAIL=your-email@gmail.com
PASSWORD=your-16-character-app-password
MAIL_FROM="Xpense <your-email@gmail.com>"
MAIL_SECURE=false
SMTP_CONNECTION_TIMEOUT_MS=15000
SMTP_GREETING_TIMEOUT_MS=15000
SMTP_SOCKET_TIMEOUT_MS=30000
```

After changing these values, restart the backend server. Gmail will not work with your normal Google account password; it must be an app password.

If Gmail works locally but times out on a hosted server, the host may be blocking outbound SMTP ports such as `465` and `587`. In that case, use an HTTPS email API provider or Gmail API instead of SMTP.
