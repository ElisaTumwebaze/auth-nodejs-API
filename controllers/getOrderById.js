const pool = require('../models/dbConfig');
//get order by its order_id controller
module.exports =async(req,res)=>{
    const{orderId} =req.params;
    try{
        const getOrder = await pool.query("SELECT * FROM orders WHERE order_id = $1",[orderId]);
        if(getOrder.rows.length > 0){
           const order =getOrder.rows[0]
           return res.json(order);
        } else{
            return res.status(404).json({error:'Order not Found'})
        }  
    }
    catch(err){
        console.error(err.message);
    }
}
