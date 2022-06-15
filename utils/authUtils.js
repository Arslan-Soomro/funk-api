// Utility functions related with authorization or authentication should be defined in this file.

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const hashEncrypt = async (strToEncrypt) => {
  const saltRounds = 10;
  const encryptedStr = await bcrypt.hash(strToEncrypt, saltRounds);
  return encryptedStr;
};

const createJWT = (jwtPayload) => {
  const jwtSecret = "helloworld";
  return jwt.sign(jwtPayload, jwtSecret, { expiresIn: "24h" });
};

module.exports = {
  hashEncrypt,
  createJWT
};
