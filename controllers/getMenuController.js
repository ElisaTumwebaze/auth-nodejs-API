const pool = require('../models/dbConfig');
module.exports =async(req,res)=>{
    try{
        const getMeals = await pool.query("SELECT * FROM foods");
        if(getMeals){
            return res.status(200).json({message:getMeals.rows});
        }        
    }
    catch(err){
        res.status(500).json({error:err.message});
    }   
}
