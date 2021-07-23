const pool = require('../models/dbConfig');
//Get all orders controller
module.exports = async(req,res)=>{
    try{
        const getOrders = await pool.query("SELECT * FROM orders");
        if(getOrders){
            const allOrders = await getOrders.rows;
           res.status(200).json({message:allOrders})     
        }
    }
    catch(err){
        console.error(err.message)
        res.status(500).json({error:'Server error'});
    }
}
