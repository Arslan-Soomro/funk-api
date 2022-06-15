const express = require("express");
const router = express.Router();
const { checkSchema, validationResult } = require("express-validator");
const db = require("../services/db");
const { BuyerValidationSchema } = require("../services/validationSchemas");
const { RespondToValidationErrors } = require("../utils/utils");

router.get("/", (req, res) => res.send("You Have Reached Buyer Route."));

//Adds a user into database and responds with a token
//encrypt the password and then store
//Generate a token
router.post(
  "/signup",
  checkSchema(BuyerValidationSchema()),
  RespondToValidationErrors,
  async (req, res) => {
    const { username, email, first_name, last_name, password } = req.body;
    const query = `
        INSERT INTO buyer
        (username, email, first_name, last_name, password)
        VALUES (?, ?, ?, ?, ?)
    `;
    const result = await db.execute(query, [
      username,
      email,
      first_name,
      last_name,
      password,
    ]);
    console.log(result);
    res.send("Signup");
  }
);

module.exports = router;
