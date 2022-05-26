const mysql = require('mysql2');
 
const db = mysql.createPool({
    host : 'localhost',
    user : 'kim',
    password : '1234',
    database : 'capstone'
});
 
module.exports = db;