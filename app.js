require('dotenv').config();
require('./models/dbInit');

const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const { stringify } = require('querystring');
const path = require('path');
const User = require('./models/User');
const { hashPassword } = require('./static/js/hash');

const app = express();
const port = process.env.PORT || 8080;


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));
app.use('/static', express.static(`${__dirname}/static`));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.post('/', async (req, res) => {


  if (req.body.captcha===undefined || req.body.captcha === '' || req.body.captcha===null) {
    return res.send({ status:'error', msg: 'Captcha not verified.' });
  }


  // Secret key
  const secretKey = process.env.SECRET_KEY;

  const query = stringify({
    secret: secretKey,
    response: req.body.captcha,
    remoteip: req.connection.remoteAddress,
  });
  const verifyURL = `https://google.com/recaptcha/api/siteverify?${query}`;


  const body = await fetch(verifyURL).then((response) => response.json());

  // If not successful
  if (body.success !== undefined && !body.success) {
    console.log(body)
    return res.send({ status:'error', msg: 'Failed captcha verification' });
  }
  
  

  // if (!(typeof req.body.email === 'string' && typeof req.body.password === 'string')) {
  //   res.send({ status: 'success' });
  //   return 1;
  // }

  // if (req.body.email.length > 150 || req.body.password.length > 150
  //   || req.body.name.length > 150) {
  //   res.send({ status: 'success' });
  //   return 2;
  // }


  // const newUser = new User({
  //   email: req.body.email,
  //   name: req.body.name,
  //   phone: req.body.phone,
  //   password: await hashPassword(req.body.password),
  //   timestamp: Date.now(),
  //   verified: false,
  // });

  // let student;
  // try {
  //   student = await newUser.save();
  //   console.log('3');
  // } catch (e) {
  //   console.log(`Error occured: ${e}`);
  //   return 0;
  // }

  res.send({ status: 'success' });
  res.status(200);
  res.end();
});


// ____________________________________


app.get('/', (req, res) => {
  res.render('signup');
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
