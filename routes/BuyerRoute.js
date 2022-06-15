const express = require('express');
const router = express.Router();
const { checkSchema, validationResult } = require('express-validator');
const { BuyerValidationSchema } = require('../services/validationSchemas');
const { RespondToValidationErrors } = require('../utils/utils');

router.get('/', (req, res) => res.send("You Have Reached Buyer Route."));

router.post('/signup', checkSchema(BuyerValidationSchema()), RespondToValidationErrors, (req, res) => {
    const errors = validationResult(req);
    //console.log(errors);
    res.send("Signing UP");
})

module.exports = router;