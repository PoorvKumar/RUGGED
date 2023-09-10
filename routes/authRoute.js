const express=require('express')
const authController=require('../controllers/authController')
const router=express.Router()
router.get('/login',authController.getLogin)
router.post('/login',authController.postLogin)
router.post('/login/verifyEmail',authController.verifyEmail)
router.get('/logout',authController.postLogout)
router.get('/signup',authController.getSignup)
router.post('/signup/verifyEmail',authController.verifyEmail);
router.post('/signup/verifyMobile',authController.verifyMobile)
router.post('/signup',authController.postSignup)
module.exports=router