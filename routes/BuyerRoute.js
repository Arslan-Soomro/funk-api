const express = require('express');
const router = express.Router();
const { checkSchema, validationResult } = require('express-validator');
const { BuyerValidationSchema } = require('../services/validator');

router.get('/', (req, res) => res.send("You Have Reached Buyer Route."));

router.post('/signup', checkSchema(BuyerValidationSchema()) ,(req, res) => {
    const errors = validationResult(req);
    console.log(errors)
    res.send("Signing UP");
})

module.exports = router;