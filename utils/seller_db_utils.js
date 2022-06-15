const db = require('./database');
const {searchUtil} = require('../utils/utils');
const { router } = require('../routes/buyer');

const register = async (username, dob, address, contact_no) =>{
    if(!(await(searchUtil("seller", "username", username)))){
        const regQuery = `INSERT INTO seller (username, dob, address, contact_no) VALUES (?, ?, ?, ?)`
        const queryResult = await db.execute(regQuery,[username, dob, address, contact_no]);
        console.log(queryResult);
    }
    else console.log("Useer has already registered as a Seller!");
}

module.exports = {
    register
}
