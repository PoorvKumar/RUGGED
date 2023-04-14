const path = require('path');
const express = require('express');
const router = express.Router();
router.get('/Wishlist', (req, res, next) => {
  const data=req.session.user
  if(data){
  res.render('wishList',{data:data,isLoggedin:req.session.isLoggedin} );
}
else{
   const val={
    firstname: 'User'
   }
   res.render('wishList',{data:val,isLoggedin:req.session.isLoggedin})
}
})
module.exports = router;