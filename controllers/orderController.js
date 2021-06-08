const pool = require('../models/dbConfig');
const jwt =require('jsonwebtoken');

//post orders controller
module.exports = async(req,res)=>{
    const jwtToken = req.header('token')
    const payload = await jwt.verify(jwtToken,'my_secret_key')
    const userId = payload.user.userId;
    const {foodId,quantity,location} = req.body;
    
    try{
        const order = await pool.query("INSERT INTO orders(food_id,user_id,quantity,location) VALUES($1,$2,$3,$4) RETURNING *",[foodId,userId,quantity,location]);
        if(order){
            const viewOrder = await order.rows[0];
           res.json({viewOrder})     
        }
    }
    catch(err){
        console.error(err.message)
        res.status(500).send('server Error')
    }
}
