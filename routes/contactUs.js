var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/contact', function (req, res, next) {
    const data = req.session.user
    if (data) {
        res.render('contactus.ejs', { data: data });
    }
    else{
        const val={
         firstname: 'User'
        }
        res.render('contactus.ejs',{data:val})
     }
});

module.exports = router;