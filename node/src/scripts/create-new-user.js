require('dotenv').config();

const bcrypt = require('bcryptjs');

const user = require('../databases/salary-recap-postgres/models/user');

var args = process.argv.slice(2);

const [name, email, password] = args;

const newUserWithHashedPassword = bcrypt
  .genSalt()
  .then(async (salt) => {
    return bcrypt.hash(password, salt);
  })
  .then((hashedPassword) => {
    return user.create({
      name,
      email,
      password: hashedPassword,
    })
  });
