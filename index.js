
const express = require('express');
const app = express();

const ProductRoute = require('./routes/ProductRoute');
const BuyerRoute = require('./routes/BuyerRoute');


const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/buyer', BuyerRoute);
app.use('/products', ProductRoute);


app.get((req, res) => {
    res.send("You have reached Funkaraana API");
})

app.listen(PORT, () => {
    console.log("Server is running at PORT:" + PORT);
})