const bcrypt = require('bcrypt');

async function hashPassword(pass) {
  const password = pass;

  return bcrypt.hash(password, 8);
}

module.exports.hashPassword = hashPassword;
