// Utility functions related with authorization or authentication should be defined in this file.

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./globals");

const hashEncrypt = async (strToEncrypt) => {
  const saltRounds = 10;
  const encryptedStr = await bcrypt.hash(strToEncrypt, saltRounds);
  return encryptedStr;
};

const createJWT = (jwtPayload) => {
  return jwt.sign(jwtPayload, JWT_SECRET, { expiresIn: "24h" });
};

const verifyToken = (token) => {
    try {
        const data = jwt.verify(token, JWT_SECRET);
        return data;
    }catch (err) {
        console.log("Error@TokenAuthentication: " + err.message);
    }
    return ;
}

module.exports = {
  hashEncrypt,
  createJWT,
  verifyToken
};
