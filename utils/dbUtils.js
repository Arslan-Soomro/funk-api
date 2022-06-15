// Utility Functions that aid in operations realted with database should be defined in this file

const db = require("../services/db");

/**
 * Creates table in the database
 * @param {String} tableSchema schema of the table to be created including its name
 * @param {Boolean} drop to drop the existing table or not
 * @param {String} tableName name of the table to be created
 * @returns {void} Nothing
 */
const createTable = async (tableSchema, drop, tableName) => {

    //Drop table if drop is true
    if(drop) await db.execute(`DROP TABLE IF EXISTS ${tableName}`);

    //Create the table
    await db.execute(`CREATE TABLE IF NOT EXISTS ${tableSchema}`);

};

module.exports = { createTable }