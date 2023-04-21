const express = require('express');
const router = express.Router();

const Product = require("../models/product");
const product = require('../models/product');

router.get('/filterCustomerRating', (req, res) => {
    const searchTerm = String(req.query.q);
    // console.log(searchTerm);
    const customerRating = req.query.customerRating;
    const brands = req.query.brandSelected;
    const offerSelected = req.query.offerSelected;
    const priceLL = req.query.pricefrom;
    const priceUL = req.query.priceto;
    const influencersChoice = req.query.InfluencersChoice;
    const ruggerVerified = req.query.RuggedVerrified;
    const colorSelected = req.query.colour;
    const availability = req.query.availability;
    // console.log(avl.toString());

    Product.find({ name: { $regex: searchTerm, $options: 'i' }, })
        .then(products => {
            // res.json(products);
            // console.log(products);
            // products.filter({price:{$gt:priceLL,$lt:priceUL},rating:{$gt:customerRating},colors:clr,quantity:{$gt:1},RuggedVerrified:rv,influencersChoice:ic,brands:brands,offerApplied:offerSelected});
            const priceFilter = (product) => {
                let priceAfterDiscount = product.price*(1-product.discount);
                return (priceAfterDiscount > priceLL && priceAfterDiscount < priceUL);
            };
            const customerRatingFilter = (product) => {
                return (product.ratingAvg > customerRating)
            };
            const brandFilter = (product) => {
                let index = 0;
                for (index = 0; index < brands.length; index++) {
                    if (product.brand === brands[index]) {
                        return product.brand === brands[index];
                    }
                }
                return product.brand === brands[index];
            };
            const offerFilter = (product) => {
                let index = 0;
                let j = 0;
                for (index = 0; index < offerSelected.length; index++) {
                    for (j = 0; j < product.offers.length; j++) {
                        if (product.offers[j] === offerSelected[index]) {
                            return product.offers[j] === offerSelected[index];
                        }
                    }
                }
                return product.offerApplied[j] === offerSelected[index];
            };
            const influencersChoiceFilter = (product) => {
                if (influencersChoice === true) {
                    return product.influencersNameChoice.length > 0;
                }
                return product;
            };
            const ruggedVerrifiedFilter = (product) => {
                return product.ruggedVerrified === "true";
            };
            const colorFilter = (product) => {
                return product.colour === clr;
            };
            const availabilityFilter = (product) => {
                return product.quantity > 1;
            };

            if (brands) {
                products = products.filter(brandFilter);
            }
            if (offerSelected) {
                products = products.filter(offerFilter);
            }
            if (influencersChoice) {
                products = products.filter(influencersChoiceFilter);
            }
            if (ruggerVerified) {
                products = products.filter(ruggedVerrifiedFilter);
            }
            if (colorSelected) {
                products = products.filter(colorFilter);
            }
            if (availability) {
                products = products.filter(availabilityFilter);
            }
            if (true) {
                products=products.filter(priceFilter);
            }
            
            res.render('productSearchPage.ejs', { productsData: products, user: req.session.user, isLoggedin: req.session.isLoggedin, searchTerm: searchTerm });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Server Error');
            return;
        });

});

module.exports = router;