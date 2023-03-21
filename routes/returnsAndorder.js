var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/returnsAndOrder', function(req, res, next) {
  res.render('returnsAndOrders.ejs', { title: 'Returns & Orders' });
});

module.exports = router;
