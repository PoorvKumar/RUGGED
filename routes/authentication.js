const express=require('express')
const authenticationController=require('../controllers/authentication')
const router=express.Router()
router.get('/login',authenticationController.getLogin)
router.post('/login',authenticationController.postLogin)
router.get('/logout',authenticationController.postLogout)
router.get('/signup',authenticationController.getSignup)
router.post('/signup',authenticationController.postSignup)
module.exports=router