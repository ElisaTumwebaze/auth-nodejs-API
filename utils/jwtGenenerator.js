const jwt = require('jsonwebtoken');
//jwt generator function
function jwtGenerator(user){
    const payload={
        user:{
            userId:user.id,
            userName:user.username,
            email:user.email
        }
    }
    return jwt.sign(payload,'my_secret_key',{expiresIn:'1h'});
}
module.exports = jwtGenerator
