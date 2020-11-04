const mongoose = require('mongoose');

mongoose.connect(`${process.env.DB_URL}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}, (err) => {
  if (!err) {
    console.log('Connected to DB successfully');
  } else {
    console.log(`Error in DB connection ${err}`);
  }
});
