const express = require("express");
const router = express.Router();
const { checkSchema, validationResult } = require("express-validator");
const db = require("../services/db");
const { BuyerValidationSchema } = require("../services/validationSchemas");
const { hashEncrypt } = require("../utils/authUtils");
const { RespondToValidationErrors } = require("../utils/utils");

router.get("/", (req, res) => res.send("You Have Reached Buyer Route."));

router.post(
  "/signup",
  checkSchema(BuyerValidationSchema()),
  RespondToValidationErrors,
  async (req, res) => {
    try {
      //Extract required fields form req.body
      let { username, email, first_name, last_name, password } = req.body;

      //Encrypt Password
      password = await hashEncrypt(password);

      //query for adding a buyer
      const query = `
        INSERT INTO buyer
        (username, email, first_name, last_name, password)
        VALUES (?, ?, ?, ?, ?)
    `;

      //add the buyer
      await db.execute(query, [
        username,
        email,
        first_name,
        last_name,
        password,
      ]);

      res.json("Buyer Signedup Successfully !");
    } catch (err) {
      console.log("Error@BuyerSignup: " + err.message);
      res.status(500).json({ error: "Error occured at server" });
    }
  }
);

router.post('/signin', (req, res) => {

});

module.exports = router;
