const express = require('express');
const adminController=require("../controllers/adminController");
const authMiddleware=require("../middleware/authMiddleware");
const complaintController=require("../controllers/complaintsController");
const router=express.Router();

router.get('/admin',authMiddleware,adminController.getAdminPage); //need to add isAdmin middleware

module.exports=router;