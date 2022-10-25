const pool = require('../models/dbConfig');

module.exports = async(req,res)=>{
    const{id} = req.params;
    try{
        const deleteOrder = pool.query("DELETE FROM orders WHERE order_id = $1",[id]);
        if((await deleteOrder)){
            return res.status(200).json({message:'order deleted'});
        } 
    }
    catch(err){
        res.status(400).json({error:'could not delete the order'});
        console.error(err.message)
    }
}