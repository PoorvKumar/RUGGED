const express=require('express');
const router=express.Router();

const influencerController=require("../controllers/influencerController");
const authMiddleware=require("../middleware/authMiddleware");

router.get('/influencerDash',authMiddleware,influencerController.getInfluencerDash);
router.get('/blogPost',authMiddleware,influencerController.getBlogPost);
router.get('/becomeInfluencer',authMiddleware,influencerController.getBecomeInfluencer);
router.post('/becomeInfluencer',authMiddleware,influencerController.postInfluencerRegister);

module.exports=router;