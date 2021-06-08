const pool = require('../models/dbConfig');
module.exports = async(req,res)=>{
    const{orderId} = req.params
    const {status}=req.body
    try{
        const update = await pool.query("UPDATE orders SET order_status=$1 WHERE order_id=$2",[status,orderId]);
        if(update){
           return res.json({message:'Order status updated Successfully'})
        } 

    }
    catch(err){
        console.error(err.message)
    }
}