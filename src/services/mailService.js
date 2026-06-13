const { createTransport } = require('nodemailer');
const logger = require('../utils/logger');

let transporter;

const getEnv = (key) => process.env[key]?.trim();
const brevoApiUrl = 'https://api.brevo.com/v3/smtp/email';

const getTransporter = () => {
    if (transporter) return transporter;

    const smtpUser = getEnv('SMTP_EMAIL');
    const smtpPassword = getEnv('SMTP_PASSWORD') || getEnv('PASSWORD');

    if (!smtpUser || !smtpPassword) {
        throw Object.assign(new Error('SMTP credentials are not configured'), { statusCode: 500 });
    }

    const port = Number(getEnv('SMTP_PORT')) || 587;
    transporter = createTransport({
        host: getEnv('MAIL_HOST') || 'smtp-relay.brevo.com',
        port,
        secure: String(getEnv('MAIL_SECURE')).toLowerCase() === 'true' || port === 465,
        auth: {
            user: smtpUser,
            pass: smtpPassword,
        },
    });

    return transporter;
};

const getFromAddress = () => {
    const fromName = getEnv('SMTP_FROM_NAME') || 'Xpense';
    const fromEmail = getEnv('SMTP_FROM_EMAIL') || getEnv('SMTP_EMAIL');
    return `${fromName} <${fromEmail}>`;
};

const getSender = () => ({
    name: getEnv('SMTP_FROM_NAME') || 'Xpense',
    email: getEnv('SMTP_FROM_EMAIL') || getEnv('SMTP_EMAIL'),
});

const getRecipientDomain = (email) => email?.split('@')[1] || 'unknown';

const sendEmail = async (email, otp, expiresInSeconds) => {
    const minutes = Math.ceil(expiresInSeconds / 60);
    const textContent = `Your Xpense login OTP is ${otp}. It expires in ${minutes} minute${minutes === 1 ? '' : 's'}.`;
    const htmlContent = `
        <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #111827;">
            <h2 style="margin: 0 0 12px;">Your Xpense login OTP</h2>
            <p style="margin: 0 0 16px;">Use this OTP to continue logging in:</p>
            <p style="font-size: 28px; font-weight: 700; letter-spacing: 4px; margin: 0 0 16px;">${otp}</p>
            <p style="margin: 0;">This OTP expires in ${minutes} minute${minutes === 1 ? '' : 's'}.</p>
        </div>
    `;

    if (getEnv('BREVO_API_KEY')) {
        await sendEmailViaBrevoApi(email, textContent, htmlContent);
        return;
    }

    const message = {
        from: getFromAddress(),
        to: email,
        subject: 'Your Xpense login OTP',
        text: textContent,
        html: htmlContent,
    }

    try {
        await getTransporter().sendMail(message);
        logger.info(`OTP email sent via SMTP to domain=${getRecipientDomain(email)}`);
    } catch (err) {
        logger.error(`OTP email send failed via SMTP: host=${getEnv('MAIL_HOST') || 'smtp-relay.brevo.com'} port=${getEnv('SMTP_PORT') || '587'} from=${getEnv('SMTP_FROM_EMAIL') || getEnv('SMTP_EMAIL')} toDomain=${getRecipientDomain(email)} code=${err.code || 'unknown'} command=${err.command || 'unknown'} responseCode=${err.responseCode || 'unknown'} response=${err.response || err.message}`);
        throw err;
    }
}

const sendEmailViaBrevoApi = async (email, textContent, htmlContent) => {
    const sender = getSender();
    if (!sender.email) {
        throw Object.assign(new Error('Email sender is not configured'), { statusCode: 500 });
    }

    const response = await fetch(brevoApiUrl, {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'api-key': getEnv('BREVO_API_KEY'),
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            sender,
            to: [{ email }],
            subject: 'Your Xpense login OTP',
            textContent,
            htmlContent,
        }),
    });

    if (!response.ok) {
        const errorText = await response.text();
        logger.error(`OTP email send failed via Brevo API: status=${response.status} from=${sender.email} toDomain=${getRecipientDomain(email)} response=${errorText}`);
        throw Object.assign(new Error('Could not send OTP email'), { statusCode: 500 });
    }

    logger.info(`OTP email sent via Brevo API to domain=${getRecipientDomain(email)}`);
};

module.exports = { sendEmail };
