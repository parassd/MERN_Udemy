const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
// express-validator checks if user input is correct or not
const { check, validationResult } = require('express-validator/check');

const User = require('../../models/user');
// @route POST api/users
// @desc Register User
// @access Public
router.post(
  '/',
  [
    check('name', 'Name is required.').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    try {
      //   Check if user is present or not
      let user = await User.findOne({ email });
      //   See if user exists
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      //   Get user gravatar
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm',
      });
      user = new User({
        name,
        email,
        avatar,
        password,
      });

      //   Encrypt password using bcrypt
      const salt = await bcryptjs.genSalt(10);
      //   anything that needs a promise needs await (asynch)
      user.password = await bcryptjs.hash(password, salt);
      //   save user in the database
      await user.save();

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
