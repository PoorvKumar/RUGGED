const path = require('path');
const express = require('express');
const router = express.Router();
router.get('/Blogpost', (req, res, next) => {

  const data=req.session.user
  if(data){
  res.render('influencerBlog',{data:data} );
}
else{
   const val={
    firstname: 'User'
   }
   res.render('influencerBlog',{data:val})
}
})
module.exports = router;