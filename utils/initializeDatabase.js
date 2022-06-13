const db = require("../services/db");
const { Schemas } = require("../services/schemas");
const { createTable } = require("./dbUtils");

/**
 * Initializes all required database tables
 * @param {Object} schemaObj includes all schemas for tables
 * @param {Boolean} drop either to drop existing tables or not
 * @returns {void} Nothing
 */
const initializeDatabase = async (schemaObj, drop) => {
  try {

    //Create tables from schemas one by one in given order
    for(let item in schemaObj) {
    
        await createTable(schemaObj[item], drop, item);
        console.log(`${item} table created.`);
    
    }

    process.exit(0);

    return ;

  } catch (err) {
    console.log("Error@initializeDatabase: " + err.message);
    process.exit(1);
  }
};

initializeDatabase(Schemas, false);

//createTable(Schemas.admin, true, 'admin');
