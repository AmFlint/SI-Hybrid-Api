const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('users', {
  email: {
    type: Sequelize.STRING(50),
    unique: 'compositeIndex',
    validate: {
      isEmail: {
        msg: 'Email field must be formatted as an e-mail adress'
      },
      len: {
        args: [[4, 50]],

      }
    }
  },
  username: {
    type: Sequelize.STRING(30),
    unique: 'compositeIndex',
    validate: {

    }
  },
  password: {
    type: Sequelize.STRING(150)
  }
});

// force: true will drop the table if it already exists
User.sync();

module.exports = User;