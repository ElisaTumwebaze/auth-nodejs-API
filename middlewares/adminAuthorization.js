const jwt = require('jsonwebtoken');
const pool = require('../models/dbConfig');
const dotenv = require('dotenv')
dotenv.config();
//Admin Authorization function
module.exports = async(req,res,next)=>{
    try{
        //pick authoiraztion header
        const authHeader = req.headers.authorization;
        //check if the token is not undefined
        if(typeof authHeader !== undefined){
            //split the auth headers into an array 
            const spiltedStr = authHeader.split(' ');
            //getting the token from the splited string
            const jwtToken = spiltedStr[1];
            //verify if the token is authentic
            const payload = await jwt.verify(jwtToken,process.env.JWT_KEY,{algorithm:'HS256'})
            req.user = payload.user
            const id =payload.user.userId
            //checking the role of the user
            const check = await pool.query("SELECT user_role FROM users WHERE user_id = $1",[id])
            const result=check.rows[0];
            //checking if the user_role is  an Admin
            if(result.user_role == 'Admin'){
                next();
            }
            else{
                return res.status(403).json({error: 'You are not Authorized Acess this page'});
            }
        }
        else{
            res.status(403).json({error:'Not authorized'});
        }    
    }
    catch(err){
        console.error(err.message)
        return res.status(403).json({error:'Not authorized'})
    }
}
