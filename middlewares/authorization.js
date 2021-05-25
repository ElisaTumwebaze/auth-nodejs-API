const jwt = require('jsonwebtoken');

module.exports = async(req,res,next)=>{
    try{
        //destructuring the token
        const jwtToken = req.header('token')
        //check if there is a token 
        if(!jwtToken){
            res.status(403).json('Not Authorized');
        }
        const payload = jwt.verify(jwtToken,'my_secret_key')
        req.user = payload.user
        next()
    }
    catch(err){
        console.error(err.message)
        return res.status(403).json('you are not authorized')
    }
}