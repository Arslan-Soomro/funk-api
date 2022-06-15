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

const update = async (name, price, quantity, description, rating, image, add_time, seller_id, status_id, product_id) => 
{
    var attribute = [];
    var values = [];

    if(name)
    {
        attribute.push("name = ?"); 
        values.push(name); 
    }

    if(price)
    {
        attribute.push("price= ?"); 
        values.push(price); 
    }

    if(quantity)
    {
        attribute.push("quantity= ?"); 
        values.push(quantity); 
    }

    if(description)
    {
        attribute.push("description= ?"); 
        values.push(description); 
    }

    if(rating)
    {
        attribute.push("rating= ?"); 
        values.push(rating); 
    }

    if(image)
    {
        attribute.push("image = ?"); 
        values.push(image); 
    }

    if(add_time)
    {
        attribute.push("add_time = ?"); 
        values.push(add_time); 
    }

    if(seller_id)
    {
        attribute.push("seller_id= ?"); 
        values.push(seller_id); 
    }

    if(status_id)
    {
        attribute.push("status_id= ?"); 
        values.push(status_id); 
    }


    const updateQuery = `UPDATE product SET ${attribute.join(", ")} WHERE product_id = ${product_id}`;
    const queryResult = await db.execute(updateQuery, values);
    console.log(queryResult); 
}

const deleteProd = async (product_id) => 
{
    const deleteQuery = `DELETE FROM product WHERE product_id = ${product_id}`;
    const queryResult = await db.execute(deleteQuery);
    console.log(queryResult); 

}

module.exports = { createTable, update, deleteProd}