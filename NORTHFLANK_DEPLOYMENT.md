# Deploying Xpense Backend On Northflank

This guide deploys the backend as a single service that also serves the built Angular frontend from `public`.

## Why Northflank

Northflank Sandbox is a good fit for this project because it offers always-on compute for small services. That avoids the free-tier sleep/cold-start behavior that caused confusing proxy and auth issues on Render.

## Deployment Shape

Use one public service:

```text
https://your-northflank-service-url/          Angular app
https://your-northflank-service-url/api/v1    Express API
```

This keeps auth cookies same-origin, which is important for mobile browsers.

## Before Deploying

Build the frontend into the backend `public` folder:

```bash
cd E:\Manish\projects\expense-tracker\expense-tracker-fe
npm run build:be-public
```

Commit the refreshed `expense-tracker-be/public` output if this deployment should use the latest frontend.

## Create The Service

1. Open Northflank and create a new service.
2. Connect the Git repo.
3. Set the project root to:

```text
expense-tracker-be
```

4. Use Node.js build/runtime.
5. Set build command:

```bash
npm ci
```

6. Set start command:

```bash
npm start
```

7. Expose the HTTP port from the `PORT` environment variable. The app falls back to `3000`, but hosted platforms usually inject `PORT`.
8. Set health check path:

```text
/api/v1/health
```

## Environment Variables

Set these in Northflank.

```env
NODE_ENV=production
MONGODB_URI=
JWT_SECRET=
JWT_EXPIRES_IN=7d

CORS_ORIGIN=https://your-northflank-service-url
AUTH_COOKIE_NAME=access_token
AUTH_COOKIE_MAX_AGE_DAYS=7
CSRF_COOKIE_NAME=csrf_token

RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=1000
AUTH_RATE_LIMIT_WINDOW_MS=600000
AUTH_RATE_LIMIT_MAX=10

AUTH_OTP_TTL_SECONDS=300
REDIS_URL=

BREVO_API_KEY=
SMTP_FROM_NAME=Xpense
SMTP_FROM_EMAIL=

MAIL_HOST=smtp-relay.brevo.com
SMTP_PORT=587
SMTP_EMAIL=
SMTP_PASSWORD=
MAIL_SECURE=false

AWS_REGION=ap-south-1
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_S3_BUCKET=
AWS_S3_PREFIX=receipts
AWS_S3_PUBLIC_BASE_URL=
```

### Notes

- `CORS_ORIGIN` should include the exact deployed app origin. Do not use `*` with cookie auth.
- Prefer `BREVO_API_KEY` for production email. SMTP variables are kept as fallback.
- Keep `JWT_SECRET`, AWS keys, Redis URL, and email keys secret.
- If you test locally from Angular dev server, add local origins too:

```env
CORS_ORIGIN=https://your-northflank-service-url,http://localhost:4200,http://localhost:4000
```

## External Services Needed

### MongoDB

Use the existing MongoDB Atlas connection string in `MONGODB_URI`.

### Redis

Use the existing Redis provider for OTP cache. If moving Redis to Northflank, create a Redis addon and set its connection URL as `REDIS_URL`.

### Email

Brevo API is preferred:

```env
BREVO_API_KEY=
SMTP_FROM_EMAIL=your-verified-sender@example.com
```

If using SMTP fallback, make sure the SMTP key is active and the sender is verified.

### S3

Use the existing S3 bucket and IAM user:

```env
AWS_REGION=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_S3_BUCKET=
AWS_S3_PREFIX=receipts
```

## Post-Deploy Checks

Open these in order:

```text
GET https://your-northflank-service-url/api/v1/health
GET https://your-northflank-service-url/api/config
GET https://your-northflank-service-url/
```

Then test the app:

1. Request OTP from the login page.
2. Verify OTP.
3. Confirm redirect to dashboard works on desktop and mobile.
4. Open browser dev tools and confirm the `access_token` cookie exists for the same Northflank domain.
5. Call `/api/v1/auth/me` from the logged-in app.
6. Create an expense without receipt.
7. Create an expense with receipt.
8. Scan a receipt/payment screenshot from the create expense page.

## Troubleshooting

### OTP works locally but fails in production

Check:

- `BREVO_API_KEY` is set correctly.
- `SMTP_FROM_EMAIL` is verified in Brevo.
- Logs from `src/services/mailService.js`.

### Login succeeds but mobile does not redirect

Check:

- Frontend and backend are on the same origin.
- The browser has an `access_token` cookie for the Northflank domain.
- `/api/v1/auth/me` returns the user after OTP verification.

### Receipt scan is slow

Tesseract OCR can be CPU-heavy. Large screenshots may take longer on sandbox compute. Prefer compressed images for testing.

### S3 upload fails

Check:

- `AWS_REGION` matches the bucket region.
- IAM policy allows `s3:PutObject`, `s3:GetObject`, and `s3:DeleteObject` for the bucket/prefix.
- `AWS_S3_BUCKET` is the bucket name only, not a URL.
