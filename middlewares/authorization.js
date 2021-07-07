const jwt = require('jsonwebtoken');
const dotenv= require('dotenv')
dotenv.config();
//authorizing the user function
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
            next();    
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
