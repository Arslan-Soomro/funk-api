const express = require('express')
const app = express()

const PORT = 5000;

app.get('/', (req, res) => {
    res.json({
        name: "Neha",
        age: "12",
        gender: 'F',
    });
})

app.listen(5000, () => {
    console.log(
        "Server Started At PORT " + PORT
    );
})