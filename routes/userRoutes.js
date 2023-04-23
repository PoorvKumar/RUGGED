const path = require('path');
const express = require('express');
const userController=require('../controllers/userController');
const authMiddleware=require("../middleware/authMiddleware");
const complaintController=require("../controllers/complaintsController");
const router=express.Router();

router.get('/wishList',authMiddleware,userController.getwishList);
//user dashboard routes
router.post('/userDashboard',authMiddleware,userController.postUserDashboard);
router.get('/userDashboard',authMiddleware,userController.getUserDashboard);
router.get('/userDashboard/ReturnsAndOrders',authMiddleware,userController.getUserDashboardReturnsAndOrders);
router.get('/userDashboard/Following',authMiddleware,userController.getUserDashboardFollowing);
router.get('/userDashboard/ChangePassword',authMiddleware,userController.getUserDashboardChangePassword);
router.get('/userDashboard/RuggedPlusMembership',authMiddleware,userController.getUserDashboardRuggedPlusMembership);
router.post('/userDashboard/ChangePassword',authMiddleware,userController.postUserDashboardChangePassword);
router.post('/userDashboard/RuggedPlusMembership',authMiddleware,userController.postUserDashboardRuggedPlusMembership);

// 
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