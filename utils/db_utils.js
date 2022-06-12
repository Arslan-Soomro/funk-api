const db = require('./database');

const b_signup = async (u_name, f_name, l_name, email, pass) => {
    const signup = "INSERT INTO buyer (user_name, first_name, last_name, email, password) VALUES (?, ?, ?, ?, ?)";
    const queryResult = await db.execute(signup, [u_name, f_name, l_name, email, pass]);
}

const buyerUpdate = async (f_name, l_name, email, pass) => {
    const varArr = [];
    if(u_name) varArr.push("u_name = ?");
    if(f_name) varArr.push("f_name = ?");
    if(l_name) varArr.push("l_name = ?");
    if(email) varArr.push("email = ?");
    if(pass) varArr.push("pass = ?");
    const updateQuery = `UPDATE buyer SET ${varArr.join(", ")} WHERE user_name = ?`;
    const queryResult = await db.execute(updateQuery, varArr);

    console.log(queryResult);
}



module.exports = {
    b_signup,
    buyerUpdate
}