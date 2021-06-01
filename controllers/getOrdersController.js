const pool = require('../models/dbConfig');
const jwt =require('jsonwebtoken');
const jwtGenerator = require('../utils/jwtGenerator');

//Get all orders controller
module.exports = async(req,res)=>{
    const jwtToken = req.header('token')
    const payload = await jwt.verify(jwtToken,'my_secret_key')
    const userId =payload.user.userId;
    try{
        const getOrders = await pool.query("SELECT * FROM orders");
        if(getOrders){
            const allOrders = await getOrders.rows;
           res.json({allOrders})     
        }
    }
    catch(err){
        console.error(err.message)
        res.status(500).send('server Error')
    }
}
