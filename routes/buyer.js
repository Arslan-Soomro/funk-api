const express = require('express');
const Joi = require('joi');
const{b_signup, buyerUpdate} = require('../utils/db_utils');
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

    
    const signupData = {
        u_name: req.body.username.trim(),
        f_name: req.body.first_name.trim().toLowerCase(),
        l_name: req.body.last_name.trim().toLowerCase(),
        email: req.body.email.trim(),
        pass: req.body.password.trim()
    }
    
    const result = await b_signup(signupData.u_name,signupData.f_name,signupData.l_name,signupData.email, signupData.pass)
    res.status(200).json(result)

})

router.put('/:id', async (req, res) =>{
    
    const uName = req.params.id.toString();
    
    const result = await buyerUpdate(req.body, uName);
    res.status(200).json(result);
})

module.exports = router