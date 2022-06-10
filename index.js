const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;

app.get((req, res) => {
    res.send("You have reached Funkaraana API");
})

app.listen(PORT, () => {
    console.log("Server is running at PORT:" + PORT);
})