var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/productPage', function(req, res, next) {
  res.render('productPage',{user:req.session.user , isLoggedin:req.session.isLoggedin,productInfo:product } );
})

module.exports = router;
