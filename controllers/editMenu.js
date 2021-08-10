const pool = require('../models/dbConfig');
const validPrice = require('../utils/validatePrice');
const validFoodName =require('../utils/validFoodName');

module.exports = async(req,res)=>{
    const {id} = req.params;
    const{foodname,price} = req.body
    //checking if the file is selected
    if(req.file == undefined){
       return res.status(400).json({error:'No file Selected'})
    }
    else if(foodname === ''){
        return res.status(400).json({error:'foodName is required'})
    }
    else if(!validFoodName(foodname)){
        return res.status(400).json({error:'foodname only accepts letters and spaces'});
    }
    else if(price === ''){
        return res.status(400).json({error:'price is required'})
    }
    else if(!validPrice(price)){
        return res.status(400).json({error:'Invalid Price only numeric characters'});
    }
    
    try{
        const imageUrl =req.file.path;
        const update = await pool.query("UPDATE foods SET food_name=$1,price=$2,photo=$3 WHERE food_id = $4",[foodname,price,imageUrl,id]);
            if(update){
                res.status(200).json({message:'food Updated'})
            }        
        }
    catch(err){
    console.error(err.message)
    res.status(500).json({error:'server error'})
    }
}
