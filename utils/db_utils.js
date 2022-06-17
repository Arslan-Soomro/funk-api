const db = require('./database');

/**
 * searches for the record of a user using the given attributes
 * @param {object} obj an object that contains the name of the desired table, attribute and its value
 * @returns an array, if length of the array is 0 then returns false
 */
 const searchUtil = async (obj) => {
     if(obj.attrName && obj.attrVal){
        const checkInDB = `SELECT * FROM ${obj.tabName} WHERE ${obj.attrName} = ?`
        const queryResult = await db.execute(checkInDB, [obj.attrVal])
        const vals = queryResult[0];
        console.log(vals);
        if(vals.length == 0) return false

        else return vals;
     }

     else{
        const checkInDB = `SELECT * FROM ${obj.tabName}`;
        const queryResult = await db.execute(checkInDB);
        const vals = queryResult;
        return vals;
     }
}


const b_signup = async (u_name, f_name, l_name, email, pass) => {
    const obj = {
        tabName: "buyer",
        attrName: "username",
        attrVal: u_name
    }
    if(!(await searchUtil(obj))){
    const signup = "INSERT INTO buyer (username, first_name, last_name, email, password) VALUES (?, ?, ?, ?, ?)";
    const queryResult = await db.execute(signup, [u_name, f_name, l_name, email, pass]);
   
    }
    else{
        console.log("Username already Exists!");
    }
}

const buyerUpdate = async (obj, u_name) => {
    const objj = {
        tabName: "buyer",
        attrName: "username",
        attrVal: u_name
    }
    if(await searchUtil(objj)){
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
    const obj = {
        tabName: "buyer",
        attrName: "username",
        attrVal: username
    }
    if(await searchUtil(obj)){
        const delQuery = `DELETE FROM buyer WHERE username = '${username}'`;
        const queryResult = await db.execute(delQuery);
    }

    else console.log("Username does not exist!");
}

const allBuyers = async () =>{
        const obj = {
            tabName: "buyer"
        }
        const queryResult = await searchUtil(obj);
        console.log(queryResult[0]);
}

const regAsSeller = async (username, dob, address, contact_no) =>{
    const sObj = {
        tabName: "seller",
        attrName: "username",
        attrVal: username
    }

    const bObj = {
        tabName: "buyer",
        attrName: "username",
        attrVal: username
    }
    if(!(await(searchUtil(sObj))) && await(searchUtil(bObj))){
        const regQuery = `INSERT INTO seller (username, dob, address, contact_no) VALUES (?, ?, ?, ?)`
        const queryResult = await db.execute(regQuery,[username, dob, address, contact_no]);
        console.log(queryResult);
    }
    else console.log("User has already registered as a Seller!");
}

const allSellers = async () =>{
    const obj = {
        tabName: "seller"
    }
    const queryResult = await searchUtil(obj);
    console.log(queryResult[0]);
}

const updateStatus_id = async (username, status_id) => {
    const obj = {
        tabName: "seller",
        attrName: "username",
        attrVal: username
    }
    if( await searchUtil(obj)){
        const updateQuery = `UPDATE seller SET status_id = ${status_id}`;
        const queryResult = await db.execute(updateQuery);
        console.log(queryResult);
    }
}



module.exports = {
    b_signup,
    buyerUpdate,
    deleteBuyer,
    allBuyers,
    regAsSeller,
    allSellers,
    updateStatus_id
}