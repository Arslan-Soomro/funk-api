const express = require('express');
const app = express();
const ProductRoute = require('./Routes/ProductRoute');

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use('/products', ProductRoute);

app.get((req, res) => {
    res.send("You have reached Funkaraana API");
})

app.listen(PORT, () => {
    console.log("Server is running at PORT:" + PORT);
})