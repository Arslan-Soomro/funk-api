// Connects to Database and exports the database connection
// Code To create schemas must also be added in this folder with corresponding schema names.

import mysql from "mysql2";

//Create a pooling connection
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'funk'
});

export default pool.promise();