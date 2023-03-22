var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const data=req.session.user
  if(data){
  res.render('index',{data:data} );
}
else{
   const val={
    firstname: 'User'
   }
   res.render('index',{data:val})
}
})

module.exports = router;
