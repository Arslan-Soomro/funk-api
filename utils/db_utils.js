const db = require('./database');
const {searchUtil} = require('../utils/utils');

const b_signup = async (u_name, f_name, l_name, email, pass) => {
    if(!(await searchUtil("buyer", "username", u_name))){
    const signup = "INSERT INTO buyer (username, first_name, last_name, email, password) VALUES (?, ?, ?, ?, ?)";
    const queryResult = await db.execute(signup, [u_name, f_name, l_name, email, pass]);
   
    }
    else{
        console.log("Username already Exists!");
    }
}

const buyerUpdate = async (obj, u_name) => {

    if(await searchUtil("buyer", "username", u_name)){
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

    const updateQuery = `UPDATE buyer SET ${varArr.join(" = ?, ")} = ? WHERE username = '${u_name}' `;
    console.log(updateQuery);
    const queryResult = await db.execute(updateQuery, valArr);

    console.log(queryResult);
}
else console.log("Username does not exist!");
}

const deleteBuyer = async(username) => {
    if(await searchUtil("buyer", "username", username)){
        const delQuery = `DELETE FROM buyer WHERE username = '${username}'`;
        const queryResult = await db.execute(delQuery);
    }

    else console.log("Username does not exist!");
}

const allBuyers = async () =>{
    
        const query = "SELECT * FROM buyer";
        const queryResult = await db.execute(query);
        console.log(queryResult[0]);
}



module.exports = {
    b_signup,
    buyerUpdate,
    deleteBuyer,
    allBuyers
}