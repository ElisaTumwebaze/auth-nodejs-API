const pool = require('../models/dbConfig');
//post orders controller
module.exports = async(req,res)=>{
    const {foodId,quantity,location} = req.body;
    //checking from foods table if the given food_id exist
    const checkFood =await pool.query("SELECT food_id FROM foods WHERE food_id = $1",[foodId]);
    //geting the user_id from verified token by authorization function
    const id = req.user.userId;
    //validation
    if(quantity ===''){
        return res.status(400).json({error:'Please Enter Quantity'})
    }
    else if(location === ''){
        return res.status(400).json({error:'Please enter location'})
    }
    else{
        try{
            if(checkFood.rows.length >0){
                const order = await pool.query("INSERT INTO orders(food_id,user_id,quantity,location) VALUES($1,$2,$3,$4) RETURNING *",[foodId,id,quantity,location]);
                return res.status(200).json({message:order.rows[0]})     
            }
            else{
                res.status(404).json({error:'No food with that Id'})
            }   
        }
        catch(err){
            console.error(err.message)
            res.status(500).json({error:'server Error'})
        }
    }
}
