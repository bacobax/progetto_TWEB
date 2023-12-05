const nodemailer = require('nodemailer');
/**
 * Send an email
 * @param options
 * @returns {Promise<void>}
 */
const sendEmail = async (options) => {
  // 1) Create a Transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    // host: process.env.EMAIL_HOST,
    // port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
    // Activate in gmail "less secure app" option
  });

  // 2) Define the mail options

  const mailOptions = {
    from: options.from,
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html:
  };

  // 3) Send the email

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
