// Connects to Database and exports the database connection
// Code To create schemas must also be added in this folder with corresponding schema names.
const mysql = require('mysql2');

//Create a pooling connection
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '2002',
    database: 'funk'
});

module.exports = pool.promise();