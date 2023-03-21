const path = require('path');
const express = require('express');
const router = express.Router();
router.get('/Wishlist', (req, res, next) => {
    res.render('wishList.ejs');
  });
module.exports = router;