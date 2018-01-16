const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('users', {
  email: {
    type: Sequelize.STRING
  },
  username: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  }
});

force: true will drop the table if it already exists
User.sync({force: true}).then(() => {
  // Table created
  return User.create({
    email: 'john@doe.fr',
    username: 'Hancock',
    password: 'test'
  });
});

module.exports = User;