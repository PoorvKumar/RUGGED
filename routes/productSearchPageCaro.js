var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/productsearchCaro', function(req, res, next) {
  
  const data=req.session.user
  if(data){
  res.render('productSearchPageCaro',{data:data} );
}
else{
   const val={
    firstname: 'User'
   }
   res.render('productSearchPageCaro',{data:val})
}
})

module.exports = router;
