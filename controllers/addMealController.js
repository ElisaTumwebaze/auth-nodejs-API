const pool = require('../models/dbConfig');
const jwt =require('jsonwebtoken');

//post orders controller
module.exports = async(req,res)=>{
    const {foodname,price} = req.body;
    try{
        const addMeal = await pool.query("INSERT INTO foods(food_name,price) VALUES($1,$2) RETURNING *",[foodname,price]);
        if(addMeal){
            const viewMeal = await addMeal.rows[0];
           res.json({viewMeal})     
        }
    }
    catch(err){
        console.error(err.message)
        res.status(500).send('server Error')
    }
}