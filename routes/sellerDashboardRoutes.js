const path = require('path');
const express = require('express');
const router = express.Router();
router.get('/dashboardSeller', (req, res, next) => {
  const data=req.session.user
  if(data){
  res.render('sellerDashboard',{data:data} );
}
else{
   const val={
    firstname: 'User'
   }
   res.render('sellerDashboard',{data:val})
}
})
module.exports = router;