require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

// Verify the connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});


// Function to send email after registration
const SendEmail = async (to, subject, text, html) => {
    try {
        console.log("1. sendEmail function called");
        console.log("2. Recipient:", to);

        const info = await transporter.sendMail({
            from: `"Banking Ledger" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text,
            html
        });

        console.log("3. Email response:", info);
        console.log("4. Accepted:", info.accepted);
        console.log("5. Rejected:", info.rejected);

        return info;

    } catch (error) {
        console.error("EMAIL ERROR:", error);
        throw error;
    }
};





module.exports = {SendEmail,transporter};