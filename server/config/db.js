const mysql = require('mysql2');
 
const db = mysql.createPool({
    host : 'localhost',
    user : 'root',
    password : '1234',
    database : 'capstone'
});
 
module.exports = db;