const path = require('path');
const express = require('express');
const sellerController=require('../controllers/sellerController');
const authMiddleware=require('../middleware/authMiddleware');
const router=express.Router();
router.get('/add-product',authMiddleware,sellerController.getAddProduct);
// router.post('/add-product',sellerController.postAddProduct);
router.get('/dashboardSeller',authMiddleware,sellerController.getsellerdashBoard);
router.get('/sellerPortal',sellerController.getsellerPortal);
router.get('/dashboardSeller/products',authMiddleware,sellerController.SellerGetProduct);
router.get('/dashboardSeller/addproducts',authMiddleware,sellerController.SellerGetAddProduct);
router.post("/dashboardSeller/addproducts",sellerController.sellerAddProduct);
router.get('/sellerRegister',authMiddleware,sellerController.SellerGetRegister)
router.post('/sellerRegister',authMiddleware,sellerController.SellerPostRegister)
router.post('/deleteproduct',authMiddleware,sellerController.postdeleteproduct)
module.exports=router