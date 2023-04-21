const path = require('path');
const express = require('express');
const userController=require('../controllers/userController');
const authMiddleware=require("../middleware/authMiddleware");
const router=express.Router();

router.get('/wishList',authMiddleware,userController.getwishList);
router.get('/userDashboard',authMiddleware,userController.getUserDashboard);
router.post('/userDashboard',userController.updateUserPost);
router.get('/deleteUser',userController.deleteUser);
router.post('/addtoCart',userController.postAddtoCart)
router.post('/deletefromCart',userController.postDeleteCart)
router.post('/createwishList',userController.postcreatewishList)
router.post('/addProductToWishlistDefault',userController.postaddproductinDefaultList)
router.post('/addtorandomwishList',userController.postaddproductinrandomList)
router.post('/deleteProductFromwishList',userController.postdeleteproductfromwishList)
router.post('/deletewishList',userController.postdeletewishList)
module.exports=router