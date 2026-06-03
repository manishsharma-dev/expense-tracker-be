const twilio = require('twilio');

const client = twilio(
    process.env.TWILIO_SID,
    process.env.TWILIO_TOKEN
);

async function sendSMS(phone, otp) {

    await client.messages.create({
        body: `Your OTP is ${otp}`,
        from: process.env.TWILIO_PHONE,
        to: `+91${phone}`
    });

}

module.exports = sendSMS;