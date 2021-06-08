const Pool = require('pg').Pool;
// Database connection 
const pool = new Pool({
    user:'postgres',
    password:'conas91100Y',
    database:'first-food-db',
    host: 'localhost',
    port:'5432'
});
module.exports = pool;