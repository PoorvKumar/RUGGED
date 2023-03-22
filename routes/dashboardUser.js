var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/dashboardUser', function(req, res, next) {
  const data=req.session.user
  if(data){
  res.render('userDashboard',{data:data} );
}
else{
   const val={
    firstname: 'User'
   }
   res.render('userDashboard',{data:val})
}
})

module.exports = router;
