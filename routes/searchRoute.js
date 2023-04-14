const express=require('express');
const router=express.Router();

const Product=require("../models/product");

// Route to handle search queries
router.get('/search', (req, res) => {
    const searchTerm = req.query.q;

    // Query MongoDB for products matching the search term
    Product.find({ name: { $regex: searchTerm, $options: 'i' } })
        .then(products => {
            res.json(products);
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Server Error');
            return;
        });
});

module.exports=router;