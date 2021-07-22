const pool = require('../models/dbConfig');
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator');

//login controller    
module.exports = async (req,res)=>{
    const {username,password} = req.body;
    try{
        const user = await pool.query("SELECT * FROM users WHERE user_name = $1",[username]);
        if(user.rows.length === 0){
           return res.status(401).json({error:'Invalid login credentials'});
        }
        const validPassword = await bcrypt.compare(password,user.rows[0].user_password);
        if(!validPassword){
            return res.status(401).json({error:'Invalid login credentials'});
        }else{
            const userRole = await user.rows[0].user_role
            const token = await jwtGenerator(user.rows[0])
            return res.status(200).json({token,userRole});
        }      
    }
    catch(err){
        console.error(err.message)
    }
}
