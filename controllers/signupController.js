const pool = require('../models/dbConfig');
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator');
const emailValid= require('../utils/emailValid');
const usernameValid=require('../utils/usernameValid');

//signup controller
module.exports = async(req,res) =>{
    const {username,email,password} = req.body;
//validation of the user information
    if(username ===''){
        return res.status(400).json({error:'Please enter the username'});
    }
    else if(!usernameValid(username)){
        return res.status(400).json({error:'usernane allows Only letters and spaces'});
    }
     
    else if(email ===''){
        return res.status(400).json({error:'email is required'});
    }
    else if(!emailValid(email)){
        return res.status(422).json({error:'Invalid email'})
    }
    else if(password ===''){
        return res.status(400).json({error:'password is required'});
    }
    else if(username.length<4){
        return res.status(400).json({error:'username should be atleast 4 characters'});
    }
    else if(password.length<6){
        return res.status(400).json({error:'password should be atleast 6 characters'});   
    }

    else{   
        try{
            //check if the username is taken 
            const checkUser = await pool.query("SELECT FROM users WHERE user_name =$1",[username]);
            if(checkUser.rowCount>0){
            return res.status(400).json({error:'That Username is Taken'})
            }
            else{
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password,salt);
                const user = await pool.query("INSERT INTO users(user_name,user_email,user_password) VALUES($1,$2,$3) RETURNING *",[username,email,hashedPassword]);
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
