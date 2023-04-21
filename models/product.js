const mongoose = require('mongoose')
const Schema = mongoose.Schema
const product = new Schema({
  // _id:{
  //   type:String
  // },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  // company:{
  //   type:String,
  //   required:true
  // },
  discount: {
    type: Number,
    required: true
  },
  dimension: {
    // should have length,breadth and height
    type: String,
    required: true
  },
  weight: {
    type: String,
    required: true
  },
  colors: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  // only one tags or categories should be present
  tags: {
    type: String,
    required: true
  },
  categories: {
    type: String,
    required: true
  },
  // photos should be an array of image urls
  photosURLS: [{
    photoURL: {
      type: String
    }
  }],
  table: {
    type: String,
    required: true
  },
  // rather than review id we should have entire review document here.
  // it should consist of no. of 5 star, 4 star, 3 star , 2 star , 1 star, and 0 star reviews. 
  // it should also consist of average no. of stars as review.
  // it should also have an array of documents consisting of individual reviews.
  reviewsID: {
    type: String
  },
  quantity: {
    type: Number,
    required: true
  },
  sellerID: {
    type: String
  },
  
});

module.exports = mongoose.model('Product', product);
