const express=require('express');
const router=express.Router();

const influencerController=require("../controllers/influencerController");
const authMiddleware=require("../middleware/authMiddleware");

router.get('/influencerDash',authMiddleware,influencerController.getInfluencerDash);
router.get('/blogPost',influencerController.getBlogPost);

module.exports=router;