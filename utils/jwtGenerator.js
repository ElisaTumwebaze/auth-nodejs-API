const jwt = require('jsonwebtoken');
const dotenv= require('dotenv')
dotenv.config();
//jwt generator function
function jwtGenerator(user){
    const payload={
        user:{
            userId:user.user_id,
            userName:user.user_name,
            email:user.user_email
        }
    }
    return jwt.sign(payload,process.env.JWT_KEY,{expiresIn:'1h'});
}
module.exports = jwtGenerator
