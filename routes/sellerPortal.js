const path = require('path');
const express = require('express');
const router = express.Router();
router.get('/sellerPortal', (req, res, next) => {
    res.render('sellerPortal.ejs');
  });
module.exports = router;