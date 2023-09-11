const express=require('express');
const router=express.Router();

// const Product=require("../models/product");
const searchController=require("../controllers/searchController");

// Route to handle search queries
router.get('/search',searchController.searchRes);
router.get('/search_by_ajax',searchController.searchResultsAjax);

module.exports=router;