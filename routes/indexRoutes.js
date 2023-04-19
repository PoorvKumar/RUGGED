const express=require('express')
const authMiddleware=require('../middleware/authMiddleware')
const indexController=require('../controllers/index')
const router=express.Router()
router.get('/',authMiddleware,indexController.getLandingpage)
module.exports=router