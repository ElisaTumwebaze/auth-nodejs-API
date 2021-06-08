const pool = require('../models/dbConfig');
//get order by its order_id controller
module.exports =async(req,res)=>{
    const{orderId} =req.params;
    try{
        const getOrder = await pool.query("SELECT * FROM orders WHERE order_id = $1",[orderId]);
        if(getOrder){
            const Order = getOrder.rows[0];
            res.json({Order})
        }   
    }
    catch(err){
        console.error(err.message);
    }
}
