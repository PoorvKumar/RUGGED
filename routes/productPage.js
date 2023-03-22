var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/productPage', function(req, res, next) {
  const data=req.session.user
  if(data){
  res.render('productPage',{data:data} );
}
else{
   const val={
    firstname: 'User'
   }
   res.render('productPage',{data:val})
}
})

module.exports = router;
