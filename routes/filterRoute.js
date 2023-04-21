const express = require('express');
const router = express.Router();

const Product = require("../models/product");
const product = require('../models/product');

router.get('/filterCustomerRating', (req, res) => {
    // using search term and passing it ahead
    const searchTerm = String(req.query.q);
    console.log(searchTerm);
    // rating
    const customerRating = req.query.customerRating;
    // brands
    const brands = req.query.brandSelected;
    // offers
    const offerSelected = req.query.offerSelected;
    // price
    const priceLL = req.query.pricefrom;
    const priceUL = req.query.priceto;
    // influencers choice
    const ic = req.query.InfluencersChoice;
    // rugged verrified
    const rv = req.query.RuggedVerrified;
    // color
    const clr = req.query.colour;
    // available
    const avl = req.query.availability;
    console.log(avl.toString());

    Product.find({ name: { $regex: searchTerm, $options: 'i' }, })
        .then(products => {
            // res.json(products);
            // console.log(products);
            // products.filter({price:{$gt:priceLL,$lt:priceUL},rating:{$gt:customerRating},colors:clr,quantity:{$gt:1},RuggedVerrified:rv,influencersChoice:ic,brands:brands,offerApplied:offerSelected});
            const priceFilter = products.filter((product) => 
            { 
                return (product.price > priceLL && product.price < priceUL); 
            });
            const customerRatingFilter = products.filter((product)=>{
                return (product.ratingAvg>customerRating)
            });
            const brandFilter = products.filter((product)=>{
                let index=0;
                for (index = 0; index < brands.length; index++) {
                    if (product.brand === brands[index]){
                        return product.brand===brands[index];
                    }
                }
                return product.brand===brands[index];
            });
            const offerFilter = products.filter((product)=>{
                let index=0;
                let j=0;
                for (index = 0; index < offerSelected.length; index++) {
                    for (j = 0; j < array.length; j++) {   
                        if (product.offerApplied[j] === offerSelected[index]) {
                            return product.offerApplied[j] === offerSelected[index];
                        }
                    }
                }
                return product.offerApplied[j] === offerSelected[index];
            });
            const influencersChoiceFilter = products.filter((product)=>{
                if(ic===true)
                {
                    return product.InfluencersChoice.length()>1;
                }
                return product;
            });
            const ruggedVerrifiedFilter = products.filter((product)=>{
                if(rv===true)
                {
                    return product.RuggedVerrified==="true";
                }
            });
            const colorFilter = products.filter((product)=>{
                return product.colour===clr;
            });
            const availabilityFilter = products.filter((product)=>{
                return product.quantity>1;
            });
            
            res.render('productSearchPage.ejs', { productsData: products, user: req.session.user, isLoggedin: req.session.isLoggedin, searchTerm: searchTerm });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Server Error');
            return;
        });

});

module.exports = router;