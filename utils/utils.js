//Utitlity functions that aid in performing something should be defined in here.
const searchUtil = async (attrName, attrVal) => {
    const checkInDB = `SELECT * FROM buyer WHERE ${attrName} = ?`
    const queryResult = await db.execute(checkInDB, [attrVal])
    const vals = queryResult[0];
    console.log(vals);
    if(vals.length == 0) return false

    else return vals;  
}

module.exports = {searchUtil}