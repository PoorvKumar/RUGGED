const express=require('express');
const router=express.Router();

const Product=require("../models/product");

router.get('/filterCustomerRating', (req, res) => {
    const searchTerm = req.query.q;
    // rating
    const customerRating = req.query.customerRating;
    // brands
    const brands = req.query.brandSelected;
    // offers
    const offerSelected = req.query.offerSelected;
    // price
    const priceLL = req.query.pricefrom;
    const priceUL =req.query.priceto;
    // influencers choice
    const ic = req.query.InfluencersChoice;
    // rugged verrified
    const rv = req.query.RuggedVerrified;
    // color
    const clr = req.query.colour;
    // available
    const avl = req.query.availability;

    Product.find({ name: { $regex: searchTerm, $options: 'i' }, })
        .then(products => {
            // res.json(products);
            console.log(products);
            res.render('productSearchPage.ejs',{productsData:products, data:req.session.user,searchTerm:searchTerm,isLoggedin:false});
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Server Error');
            return;
        });
    
});

module.exports=router;