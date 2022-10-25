const pool = require('../models/dbConfig');
module.exports = async(req,res)=>{
    const{id} = req.params;
    try{
        const deleteFood = pool.query("DELETE FROM foods WHERE food_id = $1",[id]);
        if((await deleteFood)){
            return res.status(200).json({message:'item deleted'});
        } 
    }
    catch(err){
        res.status(400).json({error:'could not delete item because its already ordered'});
        console.error(err.message)
    }
}