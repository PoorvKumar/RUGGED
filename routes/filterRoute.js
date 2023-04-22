const express = require('express');
const router = express.Router();

const Product = require("../models/product");
const product = require('../models/product');

function getProductsRatingArray(products) {
    productsRatingArray = [
      {
        productID: String,
        ratingArray: [],
      },
    ];
    for (let index = 0; index < products.length; index++) {
      // console.log(products[index]._id.toString());
      productsRatingArray.push(
        {
          productID: products[index]._id.toString(),
          ratingArray: [0, 0, 0, 0, 0, 0]
        }
      );
    }
    for (let index = 0; index < products.length; index++) {
      let product = products[index];
      let prai = productsRatingArray[index];
      for (let j = 0; j < product.reviewsArray.length; j++) {
        prai.ratingArray[product.reviewsArray[j].rating] = prai.ratingArray[product.reviewsArray[j].rating] + 1;
      }
    }
    return productsRatingArray;
  };
function getAverageRating(product) {
    let ratingArray= [0,0,0,0,0,0];
    for (let index = 0; index < product.reviewsArray.length; index++) {
        ratingArray[product.reviewsArray[index].rating] = ratingArray[product.reviewsArray[index].rating] + 1;
    }
    let averageRating = 0;
    let sum = 0;
    let totalNumOfPeople = 0;
    for (let index2 = 0; index2 < ratingArray.length; index2++) {
        totalNumOfPeople = totalNumOfPeople + ratingArray[index2];
        sum = sum + (index2*ratingArray[index2]);
    }
    if (totalNumOfPeople===0) {
        totalNumOfPeople=1;
    }
    averageRating = (sum / totalNumOfPeople);
    console.log(averageRating);
    return averageRating;
};
router.get('/filterProducts', (req, res) => {
    const searchTerm = String(req.query.q);
    // console.log(searchTerm);
    const customerRating = req.query.customerRating;
    const brands = req.query.brandSelected;
    const offerSelected = req.query.offerSelected;
    const priceLL = Number(req.query.pricefrom);
    const priceUL = Number(req.query.priceto);
    // console.log(priceLL);
    // console.log(priceUL);
    const influencersChoice = req.query.InfluencersChoice;
    const ruggerVerified = req.query.RuggedVerrified;
    const colorSelected = req.query.colour;
    const availability = req.query.availability;


    Product.find({ name: { $regex: searchTerm, $options: 'i' }, })
        .then(products => {
            const priceFilter = (product) => {
                let priceAfterDiscount = product.price * (1 - (product.discount * 0.01));
                return (priceAfterDiscount > priceLL && priceAfterDiscount < priceUL);
            };
            const customerRatingFilter = (product) => {
                return (getAverageRating(product) >= customerRating)
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
                if (influencersChoice === "on") {
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
            if (influencersChoice === "on") {
                products = products.filter(influencersChoiceFilter);
            }
            if (ruggerVerified === "on") {
                products = products.filter(ruggedVerrifiedFilter);
            }
            if (colorSelected) {
                products = products.filter(colorFilter);
            }
            if (availability === "on") {
                products = products.filter(availabilityFilter);
            }
            if (true) {
                products = products.filter(priceFilter);
            }
            if (customerRating) {
                products = products.filter(customerRatingFilter)
            }
            const productsRatingArray = getProductsRatingArray(products);
            // console.log(products);
            res.render('productSearchPage.ejs', { 
                productsData: products, 
                user: req.session.user, 
                isLoggedin: req.session.isLoggedin, 
                searchTerm: searchTerm,
                productsRatingArray:productsRatingArray,
             });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Server Error');
            return;
        });

});

module.exports = router;