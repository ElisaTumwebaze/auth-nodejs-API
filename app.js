const express = require('express');
const authRoutes = require('./routes/authRoutes');
const orderRoutes =require('./routes/orderRoutes');
const menuRoutes =require('./routes/menuRoutes');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT;

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//middleware for using routes
app.use(authRoutes);
app.use(orderRoutes);
app.use(menuRoutes);

//settingup an express server to listen at a port
app.listen(PORT,()=>{
    console.log(`app running on port ${PORT}`);
})
