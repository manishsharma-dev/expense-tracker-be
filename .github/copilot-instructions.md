# Copilot instructions for expense-tracker-be

Purpose
- Help AI coding agents become productive quickly in this Node/Express/Mongo codebase.

Quick start (commands)
- Install: `npm install`
- Dev server: `npm run dev` (nodemon -> `src/app.js`)
- Start production: `npm start` (runs `node src/app.js`)
- Tests: `npm test` (Jest + Supertest, coverage enabled)

Big picture
- This is a REST API built with Express and Mongoose. Entry point: `src/app.js`.
- Folder responsibilities:
  - `src/routes/`: express routers (mount new routes here and update `routes/index.js`).
  - `src/controllers/`: thin HTTP handlers; validate input, call services, return responses.
  - `src/services/`: business logic and DB interactions — prefer adding new logic here, not in controllers.
  - `src/models/`: Mongoose schemas (e.g. `src/models/User.js`).
  - `src/middlewares/`: auth (`protect`, `restrictTo`), validation, error handler.
  - `src/utils/`: helpers such as `apiResponse.js` (standardized responses) and `logger.js`.
  - `src/config/db.js`: MongoDB connection and related config.

Key patterns & conventions
- Controllers are intentionally thin — place data access and complex logic in `services`.
- Use the `apiResponse` helpers for all HTTP responses (e.g. `sendSuccess`, `sendError`, `sendBadRequest`). See `src/utils/apiResponse.js`.
- Auth: JWT-based. Middleware is at `src/middlewares/auth.js`. Use `protect` to require auth and `restrictTo(...roles)` for role checks.
- Validation: follow existing `express-validator` usage and `src/middlewares/validate.js` pattern.
- File naming: lowercase filenames in `src/`, PascalCase for Mongoose model filenames (e.g. `User.js`).

Adding a new endpoint (example flow)
1. Add/extend route in `src/routes/<resource>Routes.js` and register it in `src/routes/index.js`.
2. Implement controller in `src/controllers/<resource>Controller.js` (call service functions and return via `apiResponse`).
3. Implement business logic in `src/services/<resource>Service.js` (DB queries using models in `src/models/`).
4. Add/adjust Mongoose model in `src/models/` if necessary.
5. Add authorization middleware (`protect` / `restrictTo`) where appropriate.
6. Add Jest + Supertest tests under `tests/` mirroring existing tests (see `tests/auth.test.js`).

Integration points & external dependencies
- MongoDB: connection configured in `src/config/db.js` and controlled by `MONGODB_URI` env variable.
- JWT: `JWT_SECRET` + `JWT_EXPIRES_IN` from env.
- Logging: Winston in `src/utils/logger.js` and request logging via Morgan in `src/app.js`.

Developer workflows & tips
- Local dev: copy `.env.example` to `.env` and run `npm run dev`.
- Debugging: run `npm run dev` and add `console` or `logger` calls; nodemon will restart on changes.
- Tests: `npm test` runs Jest with coverage; mirror pattern in `tests/auth.test.js` for new tests.
- Linting/formatting: not enforced in repo; follow existing style.

Files to inspect when unsure
- [src/app.js](../src/app.js#L1) — application bootstrap and middleware setup
- [src/routes/index.js](../src/routes/index.js#L1) — where routers are mounted
- [src/controllers/authController.js](../src/controllers/authController.js#L1) — example auth flows
- [src/services/userService.js](../src/services/userService.js#L1) — service pattern example
- [src/models/User.js](../src/models/User.js#L1) — schema naming & population
- [src/utils/apiResponse.js](../src/utils/apiResponse.js#L1) — canonical response helpers

What not to change without discussion
- Global response format — keep `apiResponse` usage consistent to avoid breaking API clients.
- Auth middleware signatures (`protect`, `restrictTo`) — many controllers depend on these.

If you need more
- Ask the repo owner for expected role values, env secrets, or database fixtures for tests.

---
Please review and tell me if you'd like more examples or to include any project-specific CI/PR instructions.
