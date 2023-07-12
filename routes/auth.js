const express = require('express');
const router = express.Router();
const { getLoggedInUser } = require('../controllers/auth');
const { loginUser } = require('../controllers/users');
const { protect } = require('../middleware/auth');

router.route('/').get(protect, getLoggedInUser).post(loginUser);

module.exports = router;
