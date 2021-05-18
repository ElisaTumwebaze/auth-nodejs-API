const express = require('express');
const authRoutes = require('./routes/authRoutes');
const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//middleware for using routes
app.use(authRoutes);

//setting up an express server
app.listen(3000,()=>{
    console.log('app listening to port 3000');
})