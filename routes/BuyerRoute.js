const express = require("express");
const router = express.Router();
const { checkSchema, validationResult } = require("express-validator");
const db = require("../services/db");
const {
  BuyerSignupValidationSchema,
  BuyerSigninValidationSchema,
} = require("../services/validationSchemas");
const { hashEncrypt, createJWT } = require("../utils/authUtils");
const { getBuyerByUsername } = require("../utils/dbUtils");
const { RespondToValidationErrors } = require("../utils/utils");
const bcrypt = require("bcrypt");

router.get("/", (req, res) => res.send("You Have Reached Buyer Route."));

router.post(
  "/signup",
  checkSchema(BuyerSignupValidationSchema()),
  RespondToValidationErrors,
  async (req, res) => {
    try {
      //Extract required fields form req.body
      let { username, email, first_name, last_name, password, image } = req.body;

      //Encrypt Password
      password = await hashEncrypt(password);

      //query for adding a buyer
      const query = `
        INSERT INTO buyer
        (username, email, first_name, last_name, password, image)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

      //add the buyer
      await db.execute(query, [
        username,
        email,
        first_name,
        last_name,
        password,
        image
      ]);

      res.json({message: "Buyer Signedup Successfully !"});
    } catch (err) {
      console.log("Error@BuyerSignup: " + err.message);
      res.status(500).json({ error: "Error occured at server" });
    }
  }
);

router.post(
  "/signin",
  checkSchema(BuyerSigninValidationSchema()),
  RespondToValidationErrors,
  async (req, res) => {
    try {
      const { username, password } = req.body;

      const userData = await getBuyerByUsername(username);

      if (!userData) {
        res.status(404).json({ error: "Username is not registered !" });
        return;
      }

      if (!(await bcrypt.compare(password, userData.password))) {
        res.status(400).json({ error: "Incorrect Password !" });
        return;
      }

      const token = await createJWT({ id: username });
      res.json({ message: "Buyer Signedin Successfully !", token });
      return;
    } catch (err) {
      console.log("Error@Signin: " + err.message);
      res.status(500).json({ error: "Error occurred at server" });
    }
  }
);

router.get("/signin", async (req, res) => {
  try {
    if (req.AT_DATA) {
        const { username, email, first_name, last_name, image } = req.AT_DATA.data;
        res.status(200).json({
            username,
            email,
            first_name,
            last_name,
            image
        })
    }
  } catch (err) {
    console.log("Error@BuyerSigninGET : " + err.message);
    res.status(500).json({
      error: "Error occurred At server",
    });
  }
});

module.exports = router;
