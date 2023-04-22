const express=require('express');
const router=express.Router();

const influencerController=require("../controllers/influencerController");

router.get('/influencerDash',influencerController.getInfluencerDash);
router.get('/blogPost',influencerController.getBlogPost);

module.exports=router;