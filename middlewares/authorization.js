const jwt = require('jsonwebtoken');
const dotenv= require('dotenv')
dotenv.config();
//authorizing the user function
module.exports = async(req,res,next)=>{
    try{
        //getting the token from the request headers
        const jwtToken = req.header('token')
        //check if there is a token 
        if(!jwtToken){
            res.status(403).json('Not Authorized');
        }
        //verifying whether the token is authentic
        const payload = jwt.verify(jwtToken,process.env.JWT_KEY);
        req.user = payload.user
        next()
    }
    catch(err){
        console.error(err.message)
        return res.status(403).json('Not authorized')
    }
}
