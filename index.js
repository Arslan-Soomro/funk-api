const express = require('express');
const app = express();

const ProductRoute = require('./routes/ProductRoute');
const BuyerRoute = require('./routes/BuyerRoute');
const { verifyToken } = require('./utils/authUtils');
const db = require('./services/db');

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(async (req, res, next) => {
    const token = req.header("token");

    if(token != undefined){
        let tokenData = verifyToken(token);
        if(tokenData != undefined) {
            const { id } = tokenData;

            const [adminRow] = await db.execute("SELECT * FROM admin WHERE username = ?", [id]);

            //If it is an admin
            if(admin?.length > 0){
                req.AT_DATA = {
                    data: adminRow[0],
                    type: "admin"
                };

                return next();
            }

            const [sellerRow] = await db.execute("SELECT * FROM seller WHERE seller_id = ? || username = ?", [id, id]);

            if(seller?.length > 0){
                req.AT_DATA = {
                    data: sellerRow[0],
                    type: "seller"
                }

                return next();
            }

            const [buyerRow] = await db.execute("SELECT * FROM buyer WHERE username = ?", [id]);

            if(buyer?.length > 0){
                req.AT_DATA = {
                    data: buyerRow[0],
                    type: "buyer"
                }
                
                return next();
            }
        }

        return res.json({error: "Invalid Token"});
    }

    next();
})

app.use('/buyer', BuyerRoute);
app.use('/products', ProductRoute);

app.get((req, res) => {
    res.send("You have reached Funkaraana API");
})



app.listen(PORT, () => {
    console.log("Server is running at PORT:" + PORT);
})