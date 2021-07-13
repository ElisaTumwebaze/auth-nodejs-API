const dotenv = require('dotenv').config();
// Database connection 
let connectionString = process.env.DATABASE_URL
const {Pool} = require('pg');

const pool = new Pool({
    connectionString:connectionString 
});
module.exports = pool;
