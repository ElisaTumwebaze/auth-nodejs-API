const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const orderRoutes =require('./routes/orderRoutes');
const menuRoutes =require('./routes/menuRoutes');
require('dotenv').config();

//creating a express server instance
const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());
app.use('/images',express.static(path.join(__dirname,'images')));
app.use(cors());

//middleware for using routes
app.use(authRoutes);
app.use(orderRoutes);
app.use(menuRoutes);
//error handler
app.use(function(err,req,res,next){
    res.locals.message =err.message;
    res.status(500).json({error:err});     
})
//settingup an express server to listen at a port
app.listen(PORT,()=>{
    console.log(`app running on port ${PORT}`);
})
