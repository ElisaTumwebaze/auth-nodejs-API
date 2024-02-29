const multer = require('multer');
const path = require('path');

module.exports = multer({
    storage:multer.diskStorage({}),
    limits:{
        fileSize:1024*1024*5
    },
    fileFilter:function(req,file,cb){
        const fileTypes =/jpeg|jpg|png|gif/
        const extname =fileTypes.test(path.extname(file.originalname).toLowerCase())
        const mimetype = fileTypes.test(file.mimetype);
        
        if(mimetype && extname){
            return cb(null,true)
        }else{
            cb('Un supported FileType',false)
       }
    },
    filename:function(req,file,cb){
        cb(null,Date.now() + '_' + file.originalname)
    }  
})
