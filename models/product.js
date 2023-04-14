const mongoose=require('mongoose')
const Schema=mongoose.Schema
const product=new Schema({
  // _id:{
  //   type:String
  // },
  name:{
    type:String,
    required:true
  },
  price:{
    type:Number,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  company:{
    type:String,
    required:true
  },
  discount:{
    type:Number,
    required:true
  },
  dimension:{
    type:String,
    required:true
  },
  weight:{
    type:String,
    required:true
  },
  colors:{
    type:String,
    required:true
  },
  brand:{
    type:String,
    required:true
  },
  tags:{
    type:String,
    required:true
  },
  categories:{
    type:String,
    required:true
  },
  photos:{
    type:String
  },
  table:{
    type:String,
    required:true
  },
  reviewID:{
    type:String
  },
  quantity:{
    type:Number,
    required:true
  },
  sellerID:{
    type:String
  },
});

module.exports=mongoose.model('Product',product);
