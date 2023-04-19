var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/productsearch', function(req, res, next) {
  
  const data=req.session.user
  if(data){
  res.render('productSearchPage',{data:data,isLoggedin:true});
}
else{
   const val={
    firstname: 'User'
   }
   res.render('productSearchPage',{data:val,isLoggedin:false})
}
})

module.exports = router;
