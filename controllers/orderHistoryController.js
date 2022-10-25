const pool = require('../models/dbConfig');
//Get orders controller
module.exports = async(req,res)=>{
    try{
        //checking if there is an order of request userId extracted from authorization middleware 
        const orders = await pool.query("SELECT * FROM orders JOIN foods ON orders.food_id = foods.food_id WHERE user_id = $1",[req.user.userId]);
        if(orders.rows.length > 0){
          return res.status(200).json({message : orders.rows});     
        }
        else{
            res.status(404).json({error:'No order Found'})
        }
    }
    catch(err){
        console.error(err.message)
        res.status(500).json({error:'server Error'});
    }
}
