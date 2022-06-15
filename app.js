const express = require("express");
const app = express();
const buyerRouter = require('./routes/buyer');
const sellerRoute = require('./routes/seller');

app.use(express.json());
app.use('/buyer', buyerRouter);
app.use('/seller', sellerRoute);

const port = 5000;

app.listen(port);
    

app.get("/", (req, res) => {
    res.send("Welcome To Funkarana");
}) 