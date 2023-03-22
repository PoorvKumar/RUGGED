var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/logout', function(req, res, next) {
  req.session.destroy()
   const val={
    firstname: 'User'
   }
   res.render('index',{data:val})
})

module.exports = router;
