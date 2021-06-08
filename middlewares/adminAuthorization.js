const jwt = require('jsonwebtoken');
const pool = require('../models/dbConfig');
const dotenv = require('dotenv')
dotenv.config();
//Admin Authorization function
module.exports = async(req,res,next)=>{
    try{
        //getting the token from the request headers
        const jwtToken = req.header('token')
        //check if there is a token 
        if(!jwtToken){
            res.status(403).json('Not Authorized');
        }
        //verify if the token is authentic
        const payload = await jwt.verify(jwtToken,process.env.JWT_KEY)
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
            return res.json('Un Authorized Acess');
        }
    }
    catch(err){
        console.error(err.message)
        return res.status(403).json('Not authorized')
    }
}
