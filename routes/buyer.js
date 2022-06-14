const express = require('express');
const Joi = require('joi');
const{b_signup, buyerUpdate, searchUtil} = require('../utils/db_utils');
const {schema} = require('joi/lib/types/object');
const router = express();
function checkForUsername(id){
router.get('/', async (req, res) => {
    const [result] = await searchUtil(id);
    if([result].includes(id)){
        res.status(200);
        return false
    }

    else{
        return true
    }

})
}

router.post('/', async (req, res) =>{
    const {error} = validateSignup(req.body);
    if(error){return res.status(400).send(error.details[0].message)}
    
    const signupData = {
        u_name: req.body.u_name.trim(),
        f_name: req.body.f_name.trim().toLowerCase(),
        l_name: req.body.l_name.trim().toLowerCase(),
        email: req.body.email.trim(),
        pass: req.body.pass.trim()
    }
  
    const result = await b_signup(signupData.u_name,signupData.f_name,signupData.l_name,signupData.email,signupData.pass)
    res.status(200).json(result)

})

router.put('/:id', async (req, res) =>{
    
    const uName = req.params.id.toString();
    
    const result = await buyerUpdate(req.body, uName);
    res.status(200).json(result);
})


function validateSignup(data){
    const schema = {
        u_name: Joi.string().trim().min(3).max(30).required,
        f_name: Joi.string().trim().min(3).max(30).required,
        l_name: Joi.string().trim().min(3).max(30).required,
        email: Joi.string().trim().min(3).max(30).required,
        pass: Joi.string().trim().min(3).max(20).required 
    }
}

function validateBuyer(data){
    const schema = {
        u_name: Joi.string().trim().min(3).max(30),
        f_name: Joi.string().trim().min(3).max(30),
        l_name: Joi.string().trim().min(3).max(30),
        email: Joi.string().trim().min(3).max(30),
        pass: Joi.string().trim().min(3).max(20) 
    }
}

module.exports = router