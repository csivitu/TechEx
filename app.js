require('dotenv').config();
require('./models/dbInit');

const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const { stringify } = require('querystring');
const path = require('path');
const clients = require('./models/User');
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
  
  var vit=false;
  if(req.body.regnumber !== ''){
    vit = true;
  }

  if (typeof(req.body.email) !== 'string' && typeof(req.body.password) !== 'string' && typeof(req.body.name)!== 'string') {
    return res.send({ status: 'error', msg:'Please enter string inputs.' });
  }

  if (req.body.email.length > 150){
    return res.send({ status: 'error', msg:'Email too long. Seems suspicious' });
  }
  
  if (req.body.password.length > 150) {
    return res.send({ status: 'error', msg:'Password too long. Seems suspicious' });
  }
  
  if (req.body.name.length > 150) {
    return res.send({ status: 'error', msg:'Name too long. Seems suspicious' });
  }

  const users = await clients.findOne({ $or: [{ email: req.body.email }, { phone: req.body.phone }, {regnumber: req.body.regnumber}] });
  if (users) {
    // console.log(users);
    if (users.email === req.body.email) {
        res.send({ status: 'error', msg:`Email ${req.body.email} already exists!` });
        return;
      }

    if (users.phone === req.body.phone) {
      res.send({ status: 'error', msg:`Phone number ${req.body.phone} already exists!` });
      return;
    }
    
    if (users.regnumber === req.body.regnumber && req.body.regnumber !== '') {
      res.send({ status: 'error', msg:`Registration number ${req.body.regnumber} already exists!` });
      return;
      }
    }

  const newUser = new clients({
    email: req.body.email,
    clientName: req.body.name,
    phone: req.body.phone,
    password: await hashPassword(req.body.password),
    timestamp: Date.now(),
    regnumber: req.body.regnumber,
    vitian: vit
  });

  var student;
  try {
    student = await newUser.save();
    console.log(student);
  } catch (e) {
    console.log(`Error occured: ${e}`);
    return res.send({status:'error',msg:'Server error!'});
  }

  res.send({ status: 'success', msg:'You have registered successfully.' });
  res.status(200);
  res.end();
});


app.get('/', (req, res) => {
  res.render('signup');
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
