// Utility functions related with authorization or authentication should be defined in this file.

const bcrypt = require('bcrypt');

const hashEncrypt = async (strToEncrypt) => {
    const saltRounds = 10;
    const encryptedStr = await bcrypt.hash(strToEncrypt, saltRounds);
    return encryptedStr;
}

module.exports = {
    hashEncrypt
}