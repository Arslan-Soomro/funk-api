const db = require('./database');

/**
 * searches for the record of a user using the given attributes
 * @param {string} attrName the name of the attribute as given in the database 
 * @param {string} attrVal the value of the attribute
 * @returns an array, if length of the array is 0 then returns false
 */
const searchUtil = async (attrName, attrVal) => {
    const checkInDB = `SELECT * FROM buyer WHERE ${attrName} = ?`
    const queryResult = await db.execute(checkInDB, [attrVal])
    const vals = queryResult[0];
    console.log(vals);
    if(vals.length == 0) return false

    else return vals;  
}

const b_signup = async (u_name, f_name, l_name, email, pass) => {
    if(!(await searchUtil("username", u_name))){
    const signup = "INSERT INTO buyer (username, first_name, last_name, email, password) VALUES (?, ?, ?, ?, ?)";
    const queryResult = await db.execute(signup, [u_name, f_name, l_name, email, pass]);
   
    }
    else{
        console.log("Username already Exists!");
    }
}

const buyerUpdate = async (obj, u_name) => {

    if(!(await searchUtil("username", u_name))){
    const validAttrs = ["first_name", "last_name", "email", "password"];
    const tempBuyer = {};
    validAttrs.forEach((item) => {
        const requestItem = obj[item];
        if(requestItem){
            tempBuyer[item] = requestItem; 
        }
    });
   
    var varArr = Object.keys(obj);
    var valArr = Object.values(obj);

    const updateQuery = `UPDATE buyer SET ${varArr.join(" = ?, ")} = ? WHERE user_name = '${u_name}' `;
    console.log(updateQuery);
    const queryResult = await db.execute(updateQuery, valArr);

    console.log(queryResult);
}
else console.log("Username does not exist!");
}



module.exports = {
    b_signup,
    buyerUpdate,
    searchUtil
}