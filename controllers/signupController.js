const pool = require('../models/db');
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenenerator');

//signup controller
module.exports = async(req,res) =>{
    const {username,email,password} = req.body;

    if(username ===''){
        res.send({err:'Please enter the username'});
    }
     
    else if(email ===''){
        res.send({err:'email is required'});
    }
    else if(password ===''){
        res.send({err:'password is required'});
    }
    else{
       
    try{
        const checkUser = await pool.query("SELECT FROM users WHERE username =$1",[username]);
        if(username.length<4){
            res.send({err:'username should be atleast 4 characters'});
        }else if(password.length<6){
            res.send({err:'password should be atleast 6 characters'});
        }else if(checkUser.rowCount>0){
           return res.send({err:'That Username is Taken'})
        }
        else{
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password,salt);
            const user = await pool.query("INSERT INTO users(username,email,user_password) VALUES($1,$2,$3) RETURNING *",[username,email,hashedPassword]);
            if(user){
                 const token = jwtGenerator(user.rows[0])
                 res.json({token})     
            }
        }     
     }
     catch(err){
         console.error(err.message);
     }
    }
}