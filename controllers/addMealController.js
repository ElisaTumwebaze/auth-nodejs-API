const pool = require('../models/dbConfig');
const multer = require('multer');
const path = require('path');

//upload image controller
const storage =multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./public/imgs')
    },
    filename:function(req,file,cb){
        cb(null,Date.now() + file.originalname)
    }
});
const upload =multer({
     storage:storage,
     limits:{fileSize:1000000},
     fileFilter:function(req,file,cb){
         checkFileType(file,cb);
     }
    }).single('image')
//check File Type
function checkFileType(file,cb){
    //allowed extentions
    const filetypes =/jpeg|jpg|png|gif/;
    //check extentensions
    const extname = filetypes.test(path.extname(file.originalname))
    //check mime
    const mimetype = filetypes.test(file.mimetype);
    if(mimetype && extname){
        return cb(null,true);
    }
    else{
        cb('Un Surported File Type')
    }
}

module.exports = async(req,res)=>{
    upload(req,res,async(err)=>{
        if(err){
           return res.status(400).send({msg:err})
        }
        else{
            if(req.file == undefined){
                return res.status(400).send({msg:'No File Selected'})
            }
            else{
                const imageUrl= req.file.path;
                try{
                    const {foodname,price} = req.body;
                    const addMeal = await pool.query("INSERT INTO foods(food_name,price,photo) VALUES($1,$2,$3) RETURNING *",[foodname,price,imageUrl]);
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
        }
    })   
}
