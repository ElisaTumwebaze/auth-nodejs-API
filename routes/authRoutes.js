const express = require('express');
const loginController = require('../controllers/loginController');
const signupController = require('../controllers/signupController');
const router = express.Router();
//authentication routes
router.post('/auth/signup',signupController);
router.post('/auth/login',loginController);
module.exports = router;
