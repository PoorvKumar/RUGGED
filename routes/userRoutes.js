const path = require('path');
const express = require('express');
const userController=require('../controllers/userController');
const authMiddleware=require("../middleware/authMiddleware");
const router=express.Router();

router.get('/wishList',userController.getwishList);
router.get('/userDashboard',authMiddleware,userController.getUserDashboard);
router.post('/userDashboard',userController.updateUserPost);


module.exports=router