const pool = require('../models/db');
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenenerator');

//login controller    
module.exports = async (req,res)=>{
    const {username,password} = req.body;
    try{
        const user = await pool.query("SELECT * FROM users WHERE username = $1",[username]);
        if(user.rows.length === 0){
           return res.status(401).json({err:'Invalid login credentials'});
        }
        const validPassword = await bcrypt.compare(password,user.rows[0].user_password);
        if(!validPassword){
            return res.status(401).json({err:'Invalid login credentials'});
        }
        const token = jwtGenerator(user.rows[0])
        res.json({token});  
    }
    catch(err){
        console.error(err.message)
    }
}
