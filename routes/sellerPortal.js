const path = require('path');
const express = require('express');
const router = express.Router();
router.get('/sellerPortal', (req, res, next) => {
  const data=req.session.user
  if(data){
  res.render('sellerPortal',{data:data} );
}
else{
   const val={
    firstname: 'User'
   }
   res.render('sellerPortal',{data:val})
}
})
module.exports = router;