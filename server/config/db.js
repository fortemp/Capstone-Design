const mysql = require('mysql2');
 
const db = mysql.createPool({
    host : 'localhost',
    user : 'root',
    password : 'password',
    database : 'capstone'
});
 
module.exports = db;