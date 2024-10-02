const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'SendGrid', // or another service
  auth: {
    user: process.env.SENDGRID_USER,
    pass: process.env.SENDGRID_PASSWORD,
  },
});

exports.sendEmail = (to, message) => {
  const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to,
    subject: 'Breaking News Alert',
    text: message,
  };
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};
