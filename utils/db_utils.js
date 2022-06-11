const db = require('./database');

const b_signup = async (u_name, f_name, l_name, email, pass) => {
    const signup = "INSERT INTO buyer (user_name, first_name, last_name, email, password) VALUES (?, ?, ?, ?, ?)";
    const queryResult = await db.execute(signup, [u_name, f_name, l_name, email, pass]);
}



module.exports = {
    b_signup
}