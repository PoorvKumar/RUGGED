var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const data=req.session.user
  const val=true
  if(data){
  res.render('index',{data:data,isLoggedin:val} );
}
else{
   const val={
    firstname: 'User'
   }
   res.render('index',{data:val,isLoggedin:val})
}
})

module.exports = router;
