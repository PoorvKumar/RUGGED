const express=require('express')
const indexController=require('../controllers/indexController')
const authMiddleware=require('../middleware/authMiddleware');
const router=express.Router()
router.get('/',indexController.getLandingpage)
router.get('/newpage',indexController.getnewpage)
module.exports=router