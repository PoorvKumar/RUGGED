var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/aboutus', function (req, res, next) {
  const data = req.session.user
  if (data) {
      res.render('aboutus.ejs', { data: data });
  }
  else{
      const val={
       firstname: 'User'
      }
      res.render('aboutus.ejs',{data:val})
   }
});


module.exports = router;