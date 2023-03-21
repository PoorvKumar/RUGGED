const path = require('path');
const express = require('express');
const router = express.Router();
router.get('/signup', (req, res, next) => {
    res.render('signup.ejs');
  });
module.exports = router;