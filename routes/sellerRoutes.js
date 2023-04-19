const path = require('path');
const express = require('express');
const sellerController=require('../controllers/sellerController')
const router=express.Router()
router.get('/add-product',sellerController.getAddProduct)
router.post('/add-product',sellerController.postAddProduct)
router.get('/dashboardSeller',sellerController.getsellerdashBoard)
router.get('/sellerPortal',sellerController.getsellerPortal)
module.exports=router