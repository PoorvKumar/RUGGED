const path = require('path');
const express = require('express');
const productData=require('../utilities/product')
const router = express.Router();
router.get('/Wishlist', (req, res, next) => {
    const data={products:productData.products,
        pageTitle:'KKKK'}
    res.render('wishList.ejs',data);
  });
module.exports = router;