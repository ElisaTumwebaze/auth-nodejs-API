const express = require('express');
const adminAuthorization = require('../middlewares/adminAuthorization');
const authorization = require('../middlewares/authorization');
const addMealController =require('../controllers/addMealController');
const getMenuController =require('../controllers/getMenuController');
const menuItemByIdController = require('../controllers/menuItemByIdController');
const editMenu = require('../controllers/editMenu')
const deleteFoodController  = require('../controllers/deleteFoodController');
const upload = require('../utils/multer');

const router = express.Router();
//Admin menu routes
router.delete('/menu/:id',adminAuthorization,deleteFoodController);
router.post('/menu',adminAuthorization,upload.single('image'),addMealController);
router.get('/menu',authorization,getMenuController);
router.get('/menu/:foodId',authorization,menuItemByIdController);
router.put('/menu/:id',adminAuthorization,upload.single('image'),editMenu);
module.exports = router;
