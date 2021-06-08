const express = require('express');
const authRoutes = require('./routes/authRoutes');
const orderRoutes =require('./routes/orderRoutes');
const menuRoutes =require('./routes/menuRoutes');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//middleware for using routes
app.use(authRoutes);
app.use(orderRoutes);
app.use(menuRoutes);

//settingup an express server
app.listen(PORT,()=>{
    console.log(`app running on port ${PORT}`);
})
