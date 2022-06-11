const express = require("express");
const app = express();
const buyerRouter = require('./routes/buyer');

app.use(express.json());
app.use('/buyer', buyerRouter);

const port = 5000;

app.listen(port);
    

app.get("/", (req, res) => {
    res.send("Welcome To Funkarana");
}) 