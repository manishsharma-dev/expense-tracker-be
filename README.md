# Node + Express + MongoDB Starter

A production-ready REST API boilerplate with authentication, role-based access control, and clean architecture.

## Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB + Mongoose
- **Auth**: JWT (jsonwebtoken) + bcryptjs
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
| POST   | /api/v1/auth/login    | Public  | Login           |
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
