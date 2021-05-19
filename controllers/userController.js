const pool = require('../models/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
//extracting user information into an object
userInfoHandler = (user) => ({
    userId:user.id,
    userName:user.username,
    email:user.email
})

signup_user = async(req,res) =>{
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
            const newUser = await pool.query("INSERT INTO users(username,email,user_password) VALUES($1,$2,$3) RETURNING *",[username,email,hashedPassword]);
             if(newUser){
                 const user =newUser.rows[0];
                 const userInfo = userInfoHandler(user)
                 const token =jwt.sign(userInfo,'my_secret_key',{expiresIn:'1h'});
                 res.json({
                     token:token
                 });
             }
        }     
     }
     catch(err){
         console.error(err.message);
     }
    }

    }
  
    
login_user = async (req,res)=>{
    const {username,password} = req.body;
    try{
        const validUser = await pool.query("SELECT * FROM users WHERE username = $1",[username]);
        if(validUser.rows.length === 0){
           return res.status(401).json({err:'Invalid login credentials'});
        }
        const validPassword = await bcrypt.compare(password, validUser.rows[0].user_password);
        if(!validPassword){
            return res.status(401).json({err:'Invalid login credentials'});
        }
        const auth =validUser.rows[0];
        const userInfo = userInfoHandler(auth)
        const token =jwt.sign(userInfo,'my_secret_key');
        res.json({token});  
    }
    catch(err){
        console.error(err.message)
    }
    }
    post_orders =verifyToken,(req,res)=>{
        jwt.verify(req.token,my_secret_key,(err,authData)=>{
            if(err){
                res.sendStatus(403)
            }else{
                res.json({message:'welcome thanks',
                authData
            })
            }
        })
        

    }
// verify token
    function verifyToken(req,res,next){
        const bearerHeader = req.headers['authorization']
        if(typeof bearerHeader !=='undefined'){
            const bearerToken = bearerHeader.split(' ')[1]
            req.token = bearerToken;
            next();
        }else{
            res.sendStatus(403);
        }
    }

module.exports ={signup_user,login_user,post_orders}