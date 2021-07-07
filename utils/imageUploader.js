const multer = require('multer');
const path = require('path');
//storage method
const storage =multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./public/imgs')
    },
    filename:function(req,file,cb){
        cb(null,Date.now() + '_' + file.originalname)
    }  
});
//multer upload method
const upload =multer({
    storage:storage,
    limits:{
        fileSize:1024*1024*5
    },
    fileFilter:function(req,file,cb){
        const fileTypes =/jpeg|jpg|png|gig/
        const extname =fileTypes.test(path.extname(file.originalname).toLowerCase())
        const mimetype = fileTypes.test(file.mimetype);
        
        if(mimetype && extname){
            return cb(null,true)
        }else{
            cb('Un supported FileType',false)
       }
    }
})
module.exports ={upload:upload}
