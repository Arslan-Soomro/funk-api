const express = require("express");
const router = express.Router();

const {regAsSeller, allSellers, updateStatus_id} = require('../utils/db_utils');

router.post('/:id', async(req, res) => {
    const seller = {
        username: req.params.id,
        dob: req.body.dob,
        address: req.body.address,
        contact_no: req.body.contact_no
    }
    const data = await regAsSeller(seller.username, seller.dob, seller.address, seller.contact_no);
    res.status(200).json(data);
})

router.get('/', async (req, res) => {
    const result = await allSellers();
    res.status(200).json(result);
})

router.put('/:username', async(req, res) => {
    const username = req.params.username;
    const status = parseInt(req.body.status_id);
    const result = await updateStatus_id(username, status);
    res.status(200).json(result);
})

module.exports = router;