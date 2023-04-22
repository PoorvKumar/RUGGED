const path = require('path');
const express = require('express');
const userController=require('../controllers/userController');
const authMiddleware=require("../middleware/authMiddleware");
const complaintController=require("../controllers/complaintsController");
const router=express.Router();

router.get('/wishList',authMiddleware,userController.getwishList);
router.get('/userDashboard',authMiddleware,userController.getUserDashboard);
router.post('/userDashboard',userController.updateUserPost);
router.get('/deleteUser',authMiddleware,userController.deleteUser);
router.post('/addtoCart',userController.postAddtoCart)
router.post('/deletefromCart',userController.postDeleteCart)
router.post('/createwishList',userController.postcreatewishList)
router.post('/addProductToWishlistDefault',userController.postaddproductinDefaultList)
router.post('/addtorandomwishList',userController.postaddproductinrandomList)
router.post('/deleteProductFromwishList',userController.postdeleteproductfromwishList)
router.post('/deletewishList',userController.postdeletewishList)

router.get('/contact',complaintController.getContactUs);
router.get('/aboutus',complaintController.getAboutUs);
router.post('/contact',complaintController.postComplaints);

module.exports=router