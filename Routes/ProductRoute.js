const express = require('express');
const db = require('../services/db');
const {update, deleteProd} = require('../utils/dbUtils');
const router = express.Router();

/*
router.post('/example', async (req, res) =>{
    try {
        console.log(req.body);
        if(req.body.price != undefined){
        console.log("Total price is " + req.body.price );
        //await db.execute("INSERT INTO PRODUCTS(name, price, quantity etc) VALUES(?, ?)", [req.body.name, req.body.price]);
            res.json({
                message : "Product Added Successfully"
            });
        }else {
            console.log("Total Price Not Found");
            res.json({
                message: "Price Missing ! Could not add product"
            })
        }
    }
    
    catch(err) {
        console.log(err.message);
        res.json({
            message: "Error Occurred at server"
        })
    }
});*/

router.post('/', async (req, res) => {
    try{
        console.log("Add product details.");

        console.log("Add Name :", req.body.name);
        console.log("Add Proce :", req.body.price)
        console.log("Add Quantity :", req.body.quantity);
        console.log("Add Rating :",req.body.rating);
        console.log("Add Description :",req.body.description);
        console.log("Add image :", req.body.image);

        if(req.body.name && req.body.price && req.body.quantity && req.body.rating && req.body.description && req.body.image)
        {
            console.log("The Products Added are : ", req.body);
            await db.execute("INSERT INTO product (name, price, quantity,description,rating,image) VALUES(?,?,?,?,?,?)", [req.body.name, req.body.price, req.body.quantity, req.body.description, req.body.rating,req.body.image]);
            res.json({
                message : "Product Added Successfully"
            });
        }

        else{
            console.log("Fill all the asked details.");
            res.json({
                message: "Something is Missing ! Could not add product"
        });
        }
    }
            
    catch(err) {
        console.log(err.message);
        res.json({
            message: "Error Occurred at server"
        })
    }
});

router.put('/:id', async (req, res) => {
  try{
        const prod = {
            id: req.params.id,
            name: req.body.name?.trim(),
            price: req.body.price?.trim(),
            quantity: req.body.quantity?.trim(),
            description: req.body.description?.trim(),
            rating: req.body.rating?.trim(),
            image: req.body.image?.trim(),
            add_time: req.body.add_time?.trim(),
            seller_id: req.body.seller_id?.trim(),
            status_id: req.body.status_id?.trim()
        }
        if(prod){
            const data = await update(prod.name, prod.price, prod.quantity,prod.description,prod.rating,prod.image, prod.add_time, prod.seller_id, prod.status_id, prod.id)
            res.status(200).json(prod);
        }
  }      
    catch(err) {
        console.log(err.message);
        res.json({
            message: "Error Occurred at server"
        })
    }
});
 
router.delete('/:id',async (req, res)=>{
    try
    {
        const data = await deleteProd(req.params.id);
        res.json({
            message: "Deleted from Product."
        });
    }
    catch(err) {
        console.log(err.message);
        res.json({
            message: "Error Occurred at server"
        })
    }
});



module.exports = router;