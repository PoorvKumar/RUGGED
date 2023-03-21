const path = require('path');
const express = require('express');
const router = express.Router();
router.get('/Blogpost', (req, res, next) => {
    res.render('influencerBlog.ejs');
  });
module.exports = router;