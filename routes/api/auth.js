const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
// const User = require('../../models/User');
// @route GET api/auth
// @desc Test route
// @access Public
// adding auth here makes this path resricted
router.get('/', (req, res) => res.send('Auth route'));
// router.get('/', auth, async (req, res) => {
//   try {
//     //   Token has the ID and this is a protected route and we already set req.user = decoded.user in middleware
//     const user = await User.findById(req.user.id).select('-password');
//     res.json(user);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

module.exports = router;
