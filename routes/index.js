var express = require('express');
var router = express.Router();
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const models = require('../models');
const secret = require('../config/secret');

const User = models.user;

/* GET home page. */
router.get('/', function(req, res, next) {
  models.user.create({email: 'test'})
    .then(user => {
      res.send(user);
    })
    .catch(err => {
      res.status(400).send(err);
    })
});

/**
 * Login route, expects body parameters password and username
 * Sends back a valid json-web-token for currently logged user
 */
router.post('/login', function(req, res) {
  if (!req.body.username || !req.body.password) {
    res.status(400).json('Bad Request, please provide a Username and a Password.');
  }

  // get username from request body
  const username = req.body.username;
  const password = req.body.password;

  // Get User from Database
  User.findOne({where: {username}})
    .then(user => {
      // If no user found, send error 404
      if (!user) {
        req.status(404).json({error: 404, message: 'User doesn\'t exist.'})
      }
      // Compare given password with database password
      const pwdValidated = comparePassWord(password, user.password);
      if (!pwdValidated) {
        res.status(400).json({error: 400, message: 'Password is incorrect for this Username.'})
      }

      // Generate token valid for one hour, holding user name and id
      const token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        username: user.username,
        userId: user.id
      }, secret);

      // Create response object with user's attributes and token
      const response = Object.assign({}, {token}, user.get());
      res.json(response);
    });
  // res.json(req.body);

  function comparePassWord(password, dbPassword) {
    return md5(password) === dbPassword;
  }
});

module.exports = router;
