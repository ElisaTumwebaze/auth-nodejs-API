const express = require('express');
const adminAuthorization = require('../middlewares/adminAuthorization');
const authorization = require('../middlewares/authorization');
const addMealController =require('../controllers/addMealController');
const imageUploader = require('../utils/imageUploader');
const getMenuController =require('../controllers/getMenuController');
const router = express.Router();
//Admin menu routes
router.post('/menu',adminAuthorization,imageUploader.upload.single('image'),addMealController);
router.get('/menu',authorization,getMenuController);
module.exports = router;
