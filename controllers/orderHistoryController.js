const pool = require('../models/dbConfig');
const jwt =require('jsonwebtoken');

//Get orders controller
module.exports = async(req,res)=>{
    const jwtToken = req.header('token')
    const payload = await jwt.verify(jwtToken,'my_secret_key')
    const userId = payload.user.userId;
    try{
        const orders = await pool.query("SELECT * FROM orders WHERE user_id = $1",[userId]);
        if(orders){
            const orderHistory = await orders.rows;
           res.json({orderHistory})     
        }
    }
    catch(err){
        console.error(err.message)
        res.status(500).send('server Error')
    }
}
