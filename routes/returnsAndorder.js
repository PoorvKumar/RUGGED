var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/returnsAndOrder', function(req, res, next) {
  const data=req.session.user
  if(data){
  res.render('returnsAndOrders',{data:data} );
}
else{
   const val={
    firstname: 'User'
   }
   res.render('returnsAndOrders',{data:val})
}
})
module.exports = router;
