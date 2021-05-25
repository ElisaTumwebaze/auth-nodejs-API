const express = require('express');
const orderController = require('../controllers/orderController')
const authorization = require('../middlewares/authorization');
const router = express.Router();

//authentication routes
router.post('/users/orders',authorization,orderController);
module.exports = router;
