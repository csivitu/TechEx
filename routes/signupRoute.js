
const signup = require('express').Router();
const jwt = require('jsonwebtoken');
const { stringify } = require('querystring');
const User = require('../models/User');
const { hashPassword } = require('./actions/hash');
// const sendEmails = require('./actions/sendMails');


const JWT_SECRET = '';

signup.get('/', (req, res) => {
  res.render('signup');
});

signup.post('/', async (req, res) => {
  /* if (!req.body.captcha) {
    res.send({ success: false, status: 'captcha-not-done' });
    return;
  }

  const query = stringify({
    secret: process.env.SECRET_KEY,
    response: req.body.captcha,
    remoteip: req.connection.remoteAddress,
  });

  const verifyURL = `https://google.com/recaptcha/api/siteverify?${query}`;
  const body = await fetch(verifyURL).then((response) => response.json());

  if (body.success !== undefined && !body.success) {
    res.send({ success: false, status: 'Failed-captcha-verification' });
    return;
  }
*/

  console.log('1');
  console.log(req.body);
  if (!(typeof req.body.email === 'string' && typeof req.body.password === 'string')) {
    res.redirect('/signup');
    return;
  }

  
  if (req.body.email.length > 150 || req.body.password.length > 150
    || req.body.name.length > 150) {
    res.redirect('/signup');
    return;
  }
  

  console.log('2');

  const newUser = new User({
    email: req.body.email,
    name: req.body.name,
    phone: req.body.phone,
    password: await hashPassword(req.body.password),
    timestamp: Date.now(),
    verified: false,
  });
  let student;
  try {
    console.log('3');
    student = await newUser.save();
  } catch (e) {
    console.log(`Error occured: ${e}`);
    return;
  }
  res.send({ status: 'success' });
  const verificationToken = jwt.sign({ _id: student.id }, process.env.JWT_SECRET || JWT_SECRET);
  const link = process.env.VERIFICATION_LINK + verificationToken || `http://localhost:3000/verify?token=${student.verificationToken}`;

/*  if (process.env.MODE === 'PRODUCTION') {
    sendEmails(req.body.email, link, 'verify', (err) => {
      if (err) {
        console.error(`Error: ${err}`);
      } else {
        console.log(`Verification mail sent to ${req.body.email}`);
      }
    });
  }
  res.send({ status: 'success' });
  */
});


module.exports = signup;