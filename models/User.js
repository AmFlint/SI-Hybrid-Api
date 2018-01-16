const Sequelize = require('sequelize');
const sequelize = require('../config/db');
const md5 = require('md5');

const Post = require('./Post');

// const Post = require('./Post');
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



// Add key userId to post entity for relationships
Post.belongsTo(sequelize.models.users);
User.hasOne(sequelize.models.posts);

// force: true will drop the table if it already exists
User.sync({force: true})
  .then(() => {
    // User.findOrCreate({where: {username: 'admin'}, defaults: {email: 'admin@admin.fr', password: md5('root')}})
  });

Post.sync({force: true});

module.exports = User;