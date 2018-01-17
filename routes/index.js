var express = require('express');
var router = express.Router();
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const models = require('../models');
const secret = require('../config/secret');

const User = models.user;

/* GET home page. */
router.get('/', function(req, res, next) {
  const token = req.get('X-Access-Token');
  const decoded = jwt.verify(token, secret);
  res.json({token: decoded});
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
      const token = generateToken(jwt, user, secret);

      // Create response object with user's attributes and token
      const response = Object.assign({}, {token}, user.get());
      res.json(response);
    });
  // res.json(req.body);

  function comparePassWord(password, dbPassword) {
    return md5(password) === dbPassword;
  }
});

router.post('/signup', function(req, res) {
  const { username, password, email, passwordVerification } = req.body;

  // check passwords
  if (password !== passwordVerification) {
    res.status(400).json({error: 400, message: 'Password and verification password are different.'});
  }

  // USer object to create
  const user = {
    username,
    password: md5(password),
    email
  };
  // Try to create user, if validation fails, code 400 and return errors
  User.create(user)
    .then(user => {
      // If user is created, format exportable user's attributes
      const exportableUser = user.getExportableAttributes();
      // Generate token for new user
      const token = generateToken(jwt, user, secret);
      // format response
      const response = Object.assign({}, exportableUser, {token});
      res.json(response);
    })
    .catch(error => {
      res.status(400).json(error);
    })
});

function generateToken(jwt, user, secret) {
  return jwt.sign({
    exp: Math.floor(Date.now() / 1000) + (60 * 60),
    username: user.username,
    userId: user.id
  }, secret);
}

module.exports = router;
