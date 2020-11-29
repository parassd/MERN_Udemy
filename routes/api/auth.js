const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const bcrypt = require('bcryptjs');
const User = require('../../models/UserDetails');
const jwt = require('jsonwebtoken');
const config = require('config');
// express-validator checks if user input is correct or not
const { check, validationResult } = require('express-validator/check');

// @route GET api/auth
// @desc Test route
// @access Public
// adding auth here makes this path resricted
// router.get('/', (req, res) => res.send('Auth route'));
router.get('/', auth, async (req, res) => {
  try {
    //   Token has the ID and this is a protected route and we already set req.user = decoded.user in middleware
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route POST api/auth
// @desc Authenticate user and get token
// @access Public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      //   Check if user is present or not
      let user = await User.findOne({ email });
      //   See if user exists
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      //To make sure the password matches
      //Fetch user's password from the online db
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }
      //   Return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      };
      //   in mongoose we don't need to use _id which is what is seen in mongoDB
      // sign the token
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          //   if we get token then send it back to the client
          //   go to https://jwt.io/ and put in the token you get in postman to see what it contains
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
