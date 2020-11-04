require('dotenv').config();
require('./models/dbInit');

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const signup = require('./routes/signupRoute.js');

const app = express();
const port = process.env.PORT || 8080;


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));
app.use('/static', express.static(`${__dirname}/static`));
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/signup', signup);


app.get('/', (req, res) => {
  res.render('signup');
});
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
