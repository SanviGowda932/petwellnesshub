// CONFLICT START A
require('dotenv').config();
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
service: 'gmail',
auth: {
user: process.env.EMAIL_USER,
pass: process.env.EMAIL_PASS,
},
});
const sendConfirmationEmail = (to, appointmentDetails) => {
const mailOptions = {
from: process.env.EMAIL_USER,
to: to,
subject: 'Pet Appointment Confirmation',
html: `
<h3>Appointment Confirmed!</h3>
<p><strong>Date:</strong> ${appointmentDetails.date}</p>
<p><strong>Service:</strong> ${appointmentDetails.service}</p>
<p><strong>Pet Name:</strong> ${appointmentDetails.petName}</p>
`,
};
transporter.sendMail(mailOptions, (err, info) => {
if (err) console.error('❌ Email error:', err);
else console.log('✅ Email sent:', info.response);
});
};
module.exports = sendConfirmationEmail;
// CONFLICT MIDDLE
// server/mailer.js
require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendConfirmationEmail = (to, appointmentDetails) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to,
    subject: 'Pet Appointment Confirmation',
    html: `
      <h3>Appointment Confirmed!</h3>
      <p><strong>Date:</strong> ${appointmentDetails.date}</p>
      <p><strong>Service:</strong> ${appointmentDetails.service}</p>
      <p><strong>Pet Name:</strong> ${appointmentDetails.petName}</p>
    `,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) console.error('❌ Email error:', err);
    else console.log('✅ Email sent:', info.response);
  });
};

module.exports = sendConfirmationEmail;
// CONFLICT END B