const path = require('path');
const express = require('express');
const router = express.Router();
router.get('/sellerdashboard', (req, res, next) => {
    res.render('sellerDashboard.ejs');
  });
module.exports = router;