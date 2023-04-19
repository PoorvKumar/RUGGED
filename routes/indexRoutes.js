const express=require('express')
const indexController=require('../controllers/index')
const authMiddleware=require('../middleware/authMiddleware');
const router=express.Router()
router.get('/',indexController.getLandingpage)
module.exports=router