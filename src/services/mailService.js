const { createTransport } = require('nodemailer');

let transporter;

const getEnv = (key) => process.env[key]?.trim();

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

const sendEmail = async (email, otp, expiresInSeconds) => {
    const minutes = Math.ceil(expiresInSeconds / 60);
    const message = {
        from: getFromAddress(),
        to: email,
        subject: 'Your Xpense login OTP',
        text: `Your Xpense login OTP is ${otp}. It expires in ${minutes} minute${minutes === 1 ? '' : 's'}.`,
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #111827;">
                <h2 style="margin: 0 0 12px;">Your Xpense login OTP</h2>
                <p style="margin: 0 0 16px;">Use this OTP to continue logging in:</p>
                <p style="font-size: 28px; font-weight: 700; letter-spacing: 4px; margin: 0 0 16px;">${otp}</p>
                <p style="margin: 0;">This OTP expires in ${minutes} minute${minutes === 1 ? '' : 's'}.</p>
            </div>
        `,
    }

    await getTransporter().sendMail(message);
}

module.exports = { sendEmail };
