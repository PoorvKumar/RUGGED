const path = require('path');
const express = require('express');
const router = express.Router();
router.get('/Wishlist', (req, res, next) => {
  const data=req.session.user
  if(data){
  res.render('wishList',{data:data} );
}
else{
   const val={
    firstname: 'User'
   }
   res.render('wishList',{data:val})
}
})
module.exports = router;