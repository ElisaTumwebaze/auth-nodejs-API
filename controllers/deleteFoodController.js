const pool = require('../models/dbConfig');
const { cloudinary } = require('../utils/cloudinary');
module.exports = async(req,res)=>{
    const{id} = req.params;
    try{  
        const photoID =await pool.query("SELECT cloudinary_id FROM foods WHERE food_id = $2",[id]);
        const item =await photoID.rows[0].cloudinary_id; 
        await cloudinary.uploader.destroy(item);
         
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