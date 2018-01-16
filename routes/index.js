var express = require('express');
var router = express.Router();
const sequelize = require('../config/db');
const User = require('../models/User');
/* GET home page. */
router.get('/', function(req, res, next) {
  User.findAll().then(users => {
    res.send(users);
  });
});

module.exports = router;
