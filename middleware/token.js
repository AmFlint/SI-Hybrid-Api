const jwt = require('jsonwebtoken');
const secret = require('../config/secret');

module.exports = function(req, res, next) {
  // check header or url parameters or post parameters for token
  const token = req.get('X-Access-Token');

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, secret, function(err, decoded) {
      if (err) {
        return res.status(403).json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({
      success: false,
      status: 403,
      message: 'Authentication required, please provide a valid token.'
    });

  }
};