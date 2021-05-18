const express = require('express');
const authController = require('../controllers/userController');
const router = express.Router();
//authentication routes
router.post('/auth/signup',authController.signup_user);
router.post('/auth/login',authController.login_user);

module.exports = router;