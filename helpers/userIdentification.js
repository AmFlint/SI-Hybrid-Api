module.exports = function(req, res) {
  if (!req.decoded) {
    res.status(401).json({status: 401, message: 'Authentication required, please log in or Sign up'});
  }
  // Return user id from decoded token
  return req.decoded.userId;
};

