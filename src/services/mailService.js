const createTransport = require('nodemailer').createTransport;

const sendEmail = async (email, otp, expiresInSeconds) => {
    var transporter = createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.PASSWORD
        }
    });
    const minutes = Math.ceil(expiresInSeconds / 60);
    const message = {
        from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
        to: email,
        subject: 'Your Xpense login OTP',
        text: `Your Xpense login OTP is ${otp}. It expires in ${minutes} minute${minutes === 1 ? '' : 's'}.`,
    }

    await transporter.sendMail(message);
}

module.exports = { sendEmail };
