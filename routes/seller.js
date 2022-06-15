const express = require("express");
const sRouter = express.Router();

const {register} = require('../utils/seller_db_utils');

sRouter.post('/:id', async(req, res) => {
    const seller = {
        username: req.params.id,
        dob: req.body.dob,
        address: req.body.address,
        contact_no: req.body.contact_no
    }
    const data = await register(seller.username, seller.dob, seller.address, seller.contact_no);
    res.status(200).json(data);
})

module.exports = sRouter;