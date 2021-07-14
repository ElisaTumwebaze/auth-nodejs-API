 require('dotenv').config();
// Database connection 
const {Pool} = require('pg');
const poolConfig = {
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    host : process.env.DB_HOST ,
    port : process.env.DB_PORT,
    database :process.env.DB_NAME
}
// {
//     user : process.env.DB_USER,
//     password : process.env.DB_PASSWORD,
//     host : process.env.DB_HOST ,
//     port : process.env.DB_PORT,
//     database :process.env.DB_NAME
// };

const pool = new Pool(poolConfig);
module.exports = pool;
