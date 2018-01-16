const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('users', {
  email: {
    type: Sequelize.STRING(50),
    unique: 'compositeIndex',
    allowNull: false,
    validate: {
      isEmail: {
        msg: 'Email field must be formatted as an e-mail adress'
      },
      len: {
        args: [4, 50],
        msg: 'Email field must no be less than 4 characters and more than 50.'
      },
      isUnique: function (email) {
        User.find({ where: {email} })
          .then(function (u) { // This gets called
            if(u){
              throw new Error({error:[{message:'Email address already in use!'}]});
            }
        });
      }
    }
  },
  username: {
    type: Sequelize.STRING(30),
    unique: 'compositeIndex',
    allowNull: false,
    validate: {
      len: {
        args: [4, 30],
        msg: 'Username length must be at least 4 characters and at most 30.'
      }
    }
  },
  password: {
    type: Sequelize.STRING(150),
    allowNull: false,
    validate: {
      len: {
        args: [6, 150],
        msg: 'Password length must be between 6 characters and 150'
      }
    }
  }
});

// force: true will drop the table if it already exists
User.sync();

module.exports = User;