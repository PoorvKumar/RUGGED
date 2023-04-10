const path = require('path');
const express = require('express');
const userController=require('../controllers/user')
const router=express.Router()
router.get('/wishList',userController.getwishList)



module.exports=router