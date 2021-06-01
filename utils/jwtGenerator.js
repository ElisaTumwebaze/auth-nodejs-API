const jwt = require('jsonwebtoken');
//jwt generator function
function jwtGenerator(user){
    const payload={
        user:{
            userId:user.user_id,
            userName:user.user_name,
            email:user.user_email
        }
    }
    return jwt.sign(payload,'my_secret_key',{expiresIn:'1h'});
}
module.exports = jwtGenerator
