const mongoose = require('mongoose');

const URI ="mongodb+srv://csivit:csivit@studentinfo.krlef.mongodb.net/test?retryWrites=true&w=majority";

const connectDB = async () => {
  await mongoose.connect(URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
},
  (err) => {
  if (!err) {
    // eslint-disable-next-line no-console
    console.log('Connected to DB successfully');
  } else {
    // eslint-disable-next-line no-console
    console.log(`Error in DB connection ${err}`);
  }
})
};

module.exports = connectDB;


