const express=require('express')
const indexController=require('../controllers/indexController')
const authMiddleware=require('../middleware/authMiddleware');
const router=express.Router()
router.get('/',authMiddleware,indexController.getLandingpage)
module.exports=router