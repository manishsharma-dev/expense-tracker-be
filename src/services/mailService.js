const createTransport = require('nodemailer').createTransport;
const logger = require('../utils/logger');

const requiredMailConfig = ['MAIL_HOST', 'SMTP_PORT', 'SMTP_EMAIL', 'PASSWORD'];

const getMailConfig = () => {
    const missing = requiredMailConfig.filter((key) => !process.env[key]);

    if (missing.length) {
        const error = new Error(`Missing SMTP configuration: ${missing.join(', ')}`);
        error.statusCode = 500;
        throw error;
    }

    const port = Number(process.env.SMTP_PORT);
    if (Number.isNaN(port)) {
        const error = new Error('SMTP_PORT must be a valid number');
        error.statusCode = 500;
        throw error;
    }

    return {
        host: process.env.MAIL_HOST,
        port,
        secure: process.env.MAIL_SECURE === 'true' || port === 465,
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.PASSWORD,
        },
    };
};

const getFromAddress = () => {
    if (process.env.MAIL_FROM) {
        return process.env.MAIL_FROM;
    }

    const fromEmail = process.env.SMTP_FROM_EMAIL || process.env.SMTP_EMAIL;
    const fromName = process.env.SMTP_FROM_NAME || 'Xpense';

    return `${fromName} <${fromEmail}>`;
};

const sendEmail = async (email, otp, expiresInSeconds) => {
    const transporter = createTransport(getMailConfig());
    const minutes = Math.ceil(expiresInSeconds / 60);
    const message = {
        from: getFromAddress(),
        to: email,
        subject: 'Your Xpense login OTP',
        text: `Your Xpense login OTP is ${otp}. It expires in ${minutes} minute${minutes === 1 ? '' : 's'}.`,
    }

    try {
        const info = await transporter.sendMail(message);

        logger.info(
            `OTP email accepted by SMTP provider: messageId=${info.messageId || 'n/a'}, accepted=${(info.accepted || []).join(',') || 'none'}, rejected=${(info.rejected || []).join(',') || 'none'}`
        );

        return {
            messageId: info.messageId,
            accepted: info.accepted || [],
            rejected: info.rejected || [],
            response: info.response,
        };
    } catch (error) {
        logger.error(`OTP email send failed for ${email}: ${error.message}`);
        throw error;
    }
}

module.exports = { sendEmail };
