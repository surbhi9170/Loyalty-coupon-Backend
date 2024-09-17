const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
require('dotenv').config();


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Route to send coupon via email
router.post('/send-coupon', (req, res) => {
  const { email, discountAmount, couponId } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your Loyalty Coupon',
    text: `Congratulations! You have received a coupon with a discount amount of ${discountAmount}. To redeem your coupon use coupon code : ${couponId}. Access localhost:5173/user`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending mail:', error);
      return res.status(500).send(error.toString());
    }
    console.log('Email sent:', info.response);
    res.status(200).send('Coupon sent successfully!');
  });
  
});


module.exports = router;
