const dotenv = require('dotenv').config();
let pg = require('pg');
if(process.env.DATABASE_URL){
    pg.defaults.ssl = true;
}
c
// Database connection 
let connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.BD_PORT}/${process.env.DB_NAME}`
const {Pool} = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});
module.exports = pool;
