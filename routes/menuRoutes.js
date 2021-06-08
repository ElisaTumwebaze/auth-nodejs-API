const express = require('express');
const adminAuthorization = require('../middlewares/adminAuthorization');
const authorization = require('../middlewares/authorization');
const addMealController =require('../controllers/addMealController');
const getMenuController =require('../controllers/getMenuController');
const router = express.Router();
//Admin menu routes
router.post('/menu',adminAuthorization,addMealController);
router.get('/menu',authorization,getMenuController);
module.exports = router;
