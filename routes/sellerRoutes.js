const path = require('path');
const express = require('express');
const sellerController=require('../controllers/sellerController');
const router=express.Router();
router.get('/add-product',sellerController.getAddProduct);
router.post('/add-product',sellerController.postAddProduct);
router.get('/dashboardSeller',sellerController.getsellerdashBoard);
router.get('/sellerPortal',sellerController.getsellerPortal);
router.get('/dashboardSeller/products',sellerController.SellerGetProduct);
router.get('/dashboardSeller/addproducts',sellerController.SellerGetAddProduct);
router.post("/dashboardSeller/addproducts",sellerController.sellerAddProduct);

module.exports=router