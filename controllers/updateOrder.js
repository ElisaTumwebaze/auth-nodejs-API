const pool = require('../models/dbConfig');

function validstatus(status){
    return /^[a-zA-Z\s]+$/.test(status);
}
module.exports = async(req,res)=>{
    const{orderId} = req.params
    const {status}=req.body
    if(status === ''){
        return res.status(400).json({error:'please select Status'});
    }
    if(!validstatus(status)){
        return res.status(400).json({error:'Invalid order status'});
    }
    try{
        const update = await pool.query("UPDATE orders SET order_status=$1 WHERE order_id=$2",[status,orderId]);
        if(update){
           return res.status(200).json({message:'Order status updated Successfully'})
        } 

    }
    catch(err){
        console.error(err.message)
    }
}