# Backend Testing

This Express API uses Jest and Supertest.

## Commands

- `npm test` runs the test suite once.
- `npm run test:watch` runs tests in watch mode.
- `npm run test:coverage` runs tests and enforces coverage thresholds.
- `npm run ci` runs the CI test command.

## Coverage Gate

Coverage is configured in `jest.config.js`.

Current baseline:

- Statements: 5%
- Branches: 1%
- Functions: 1%
- Lines: 5%

These thresholds are intentionally low because the project already has a lot of API code and only a small starting test suite. Raise them after adding service/controller tests.

## What To Test First

Prioritize code that protects money and user data:

- Auth OTP request/verify behavior.
- Cookie auth and CSRF behavior.
- User ownership checks for expenses, earnings, budgets, payment methods, and debts.
- Expense create/update/delete service logic.
- Budget calculation service.
- Dashboard aggregation date boundaries.
- Receipt parser edge cases.
- Debt transaction history and payment behavior.

## Blocking Main

The GitHub workflow in `.github/workflows/ci.yml` runs `npm run test:coverage` on pull requests to `main`.

To block direct merges, enable branch protection in GitHub:

1. Go to repository Settings.
2. Open Branches.
3. Add a rule for `main`.
4. Enable `Require status checks to pass before merging`.
5. Select the `test` check from `BE CI`.
