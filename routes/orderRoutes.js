const express = require('express');
const orderController = require('../controllers/orderController')
const orderHistoryController  = require('../controllers/orderHistoryController');
const getOrdersController = require('../controllers/getOrdersController')
const getOrderById = require('../controllers/getOrderById');
const updateOrder = require('../controllers/updateOrder');
const deleteOrderController = require('../controllers/deleteOrderController');
const authorization = require('../middlewares/authorization');
const adminAuthorization = require('../middlewares/adminAuthorization');


const router = express.Router();
//user authentized order routes
router.post('/users/orders',authorization,orderController);
router.get('/users/orders',authorization,orderHistoryController);
//admin authorized order Routes
router.delete('/orders/:id',adminAuthorization,deleteOrderController);
router.get('/orders',adminAuthorization,getOrdersController);
router.get('/orders/:orderId',adminAuthorization,getOrderById);
router.put('/orders/:orderId',adminAuthorization,updateOrder);
module.exports = router;
