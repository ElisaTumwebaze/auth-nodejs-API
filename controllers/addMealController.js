const pool = require('../models/dbConfig');
const cloudinary = require('../utils/cloudinary');
const validPrice = require('../utils/validatePrice');
const validFoodName =require('../utils/validFoodName');
//add menu item controller
module.exports = async(req,res)=>{
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
    else{
        try{
            const result = await cloudinary.uploader.upload(req.file.path);
            const imageUrl =result.secure_url;
            const addFoodItem = await pool.query("INSERT INTO foods(food_name,price,photo) VALUES($1,$2,$3) RETURNING *",[foodname,price,imageUrl]);
            if(addFoodItem){
                const foodItem = await addFoodItem.rows[0];
                res.status(201).json({message:foodItem})     
            }
        }
        catch(err){
        console.error(err.message)
        res.status(500).json({error:'server error'})
        }
    }
}
