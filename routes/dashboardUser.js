var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/dashboardUser', function(req, res, next) {
  res.render('userDashboard.ejs', { title: 'USER DASHBOARD' });
});

module.exports = router;
