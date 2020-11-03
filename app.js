/* eslint-disable linebreak-style */
require('dotenv').config();
require('./models/dbInit');

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const signup = require('./routes/signupRoute');
const app = express();
const port = process.env.PORT || 8080;



// app.use(cookieParser());

app.set('views', path.join(__dirname, './views'));
app.use('/static', express.static(`${__dirname}/static`));
app.use(session({ secret: process.env.SESSION_SECRET || 'sessionSecretKey', saveUninitialized: true, resave: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.render('endevent');
});
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});