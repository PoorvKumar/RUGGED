 const express = require('express');
const adminController=require("../controllers/adminController");
const authMiddleware=require("../middleware/authMiddleware");
const adminMiddleware=require('../middleware/adminMiddleware');
const complaintController=require("../controllers/complaintsController");
const router=express.Router();

router.get('/admin',adminMiddleware,authMiddleware,adminController.getAdminPage);
router.get('/deleteThisUser',adminMiddleware,authMiddleware,adminController.deleteAUserAdmin);
router.get('/admin/orderHistoryAdmin',adminMiddleware,authMiddleware,adminController.getOrdersInfo);
router.get('/admin/complaints',adminMiddleware,authMiddleware,adminController.getComplaintsAdmin);
router.get('/admin/complaints/resolved',adminMiddleware,authMiddleware,adminController.resolveComplaintAdmin);
router.get('/admin/influencers',adminMiddleware,authMiddleware,adminController.getInfluencersInfo);
router.get('/admin/influencers/removeInfluencer',adminMiddleware,authMiddleware,adminController.removeInfluencerAdmin);
router.get('/admin/sellers',adminMiddleware,authMiddleware,adminController.getSellersInfo);
router.get('/admin/sellers/removeSeller',adminMiddleware,authMiddleware,adminController.removeSellerAdmin);

module.exports=router;