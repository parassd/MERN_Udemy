const jwt = require('jsonwebtoken');
const config = require('config');
// this is middle ware to verify the token and give access to protected routes.
// next is callback which is executed when we need to go to the next piece if all is good

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');
  //   Check if no token
  // this route is protected by middleware and can onlly be accessed with a token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }
  //   Verify token
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    //Get the user's profile
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token not valid' });
  }
};
