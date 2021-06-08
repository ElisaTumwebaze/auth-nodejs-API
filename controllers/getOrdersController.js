const pool = require('../models/dbConfig');
//Get all orders controller
module.exports = async(req,res)=>{
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
