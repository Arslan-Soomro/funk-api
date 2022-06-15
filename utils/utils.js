//Utitlity functions that aid in performing something should be defined in here.

const { validationResult } = require("express-validator");

const RespondToValidationErrors = (req, res, next) => {
    let errors = validationResult(req);

    if(errors.isEmpty()){
        next();
    }else {
        res.json({
            error: errors.errors[0].msg
        });
    }

};

module.exports = {
    RespondToValidationErrors
}