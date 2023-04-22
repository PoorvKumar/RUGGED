const express = require('express');
const router = express.Router();

const productController=require('../controllers/productController');

router.get('/filterProducts',productController.getFilter);

module.exports = router;