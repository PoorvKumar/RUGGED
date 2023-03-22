var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/productsearch', function(req, res, next) {
  
  res.render('productSearchPage.ejs', { title: '' });
});

module.exports = router;
