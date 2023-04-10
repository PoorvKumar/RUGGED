const path = require('path');
const express = require('express');
const sellerController=require('../controllers/seller')
const router=express.Router()
router.get('/add-product',sellerController.getAddProduct)
router.post('/add-product',sellerController.postAddProduct)

module.exports=router