const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.send("You Have Reached Buyer Route."));

module.exports = router;