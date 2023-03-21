var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/productPage', function(req, res, next) {
  res.render('productPage.ejs', { title: 'Product' });
});

module.exports = router;
