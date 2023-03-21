const path = require('path');
const express = require('express');
const router = express.Router();
router.get('/dashboardSeller', (req, res, next) => {
    res.render('sellerDashboard.ejs');
  });
module.exports = router;