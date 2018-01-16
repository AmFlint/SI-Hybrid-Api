const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const User = require('./User');

const Post = sequelize.define('posts', {
  title: {
    type: Sequelize.STRING(50),
    allowNull: false,
    validate: {

    }
  },
  content: {
    type: Sequelize.TEXT('long'),
    allowNull: false,
    validate: {

    }
  },
  location: {
    type: Sequelize.STRING(150),
    allowNull: false,
    validate: {
      len: {
        args: [20, 150],
        msg: 'Please fill in a location for the place you are sharing.'
      }
    }
  },
  difficulty: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defautValue: 1
  }
});

module.exports = Post;