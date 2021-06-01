const express = require('express');
const adminAuthorization = require('../middlewares/adminAuthorization');
const addMealController =require('../controllers/addMealController');
const getMenuController =require('../controllers/getMenuController');
const router = express.Router();
//Admin menu routes
router.post('/menu',addMealController,addMealController);
router.get('/menu',adminAuthorization,getMenuController);
module.exports = router;
