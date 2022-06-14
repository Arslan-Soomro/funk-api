const express = require('express');
const router = express.Router();
const { checkSchema, validationResult } = require('express-validator');

router.get('/', (req, res) => res.send("You Have Reached Buyer Route."));

router.post('/signup', checkSchema({
    username : {
        in: ["body"],
        errorMessage: "Username missing !",
        isString: true,
        toLowerCase: true,
        trim: true,
        isLength: { options: {min: 6}, errorMessage: "username must be 6 characters long" },
    }
}) ,(req, res) => {
    console.log(req.body);
    const errors = validationResult(req);
    console.log(errors)
    if(errors.isEmpty()){
        console.log("No Errors");
    }else {
        console.log("Errors");
    }
    res.send("Signing UP");
})

module.exports = router;