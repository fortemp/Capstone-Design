const mysql = require('mysql2');
 
const db = mysql.createPool({
    host : 'localhost',
    user : 'root',
    password : 'dhsmf',
    database : 'capstone'
});
 
module.exports = db;