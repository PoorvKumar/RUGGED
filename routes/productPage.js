var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/productPage', function(req, res, next) {
  // const data=req.session.user
  if(data){
  res.render('productPage',{user:req.session.user , isLoggedin } );
}
else{
   const val={
    firstname: 'User'
   }
   res.render('productPage',{data:val})
}
})

module.exports = router;
