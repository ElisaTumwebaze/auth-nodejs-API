const pool = require('../models/dbConfig');
module.exports =async(req,res)=>{
    try{
        const {foodId} = req.params;
        const menuItem = await pool.query("SELECT * FROM foods WHERE food_id = $1",[foodId]);
        if(menuItem.rows.length>0){
            return res.status(200).json({message:menuItem.rows[0]});
        }
        else{
            return res.status(404).json({error:'No Item found'});
        }        
    }
    catch(err){
        res.status(500).json({error:err.message});
    }   
}