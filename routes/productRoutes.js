const express=require('express');
const router=express.Router();

const productController=require("../controllers/productController");
const authMiddleware=require("../middleware/authMiddleware");

// router.get('/product/:productId',productController.getProductInfo);
router.get('/product',productController.getProductInfo);

module.exports=router;