const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const user = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  phoneno: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  cart: {
    item: [
      {
        productID: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
  },
  wishList: {
    lists: [
      {
        item: [
          {
            productID: {
              type: Schema.Types.ObjectId,
              ref: "Product",
              required: true,
            },
            date:{
              type: Date,
              default: Date.now
            } 
          }
        ],
        name: { type: String, required: true },
      }
    ]
  },
  isSeller:{
    type:Boolean
  },
  isInfluencer:{
    type:Boolean
  },
  isRuggedPlus:{
    type:Number
  }
});
user.methods.addToCart = function (product) {
  //Checking if product is already in the cart
  const productidx = this.cart.item.findIndex((cartProduct) => {
    return cartProduct.productID.toString() === product._id.toString();
  });
  const updatedCart = [...this.cart.item]; //Making shallow copy (one object two different instance pointing to it)
  let newQuantity = 1;
  if (productidx >= 0) {
    newQuantity = this.cart.item[productidx].quantity + 1;
    updatedCart[productidx].quantity = newQuantity;
  } else {
    updatedCart.push({
      productID: product._id,
      quantity: newQuantity,
    });
  }
  this.cart = { item: updatedCart };
  return this.save();
};
user.methods.removeFromCart = function (productID) {
  const updatedCart = this.cart.item.filter((item) => {
    return item.productID.toString() !== productID.toString();
  });
  this.cart.item = updatedCart;
  return this.save();
};
user.methods.createWishList=function (listName) {
  const listidx = this.wishList.lists.findIndex((list) => {
    return list.name.toString() === listName.toString();
  });
  if(listidx<0){
     this.wishList.lists.push({
      name:listName,
      item:[]
     })
  }
  else{
    //List already there
  }
  return this.save()
}
user.methods.addProductinWishList= function (product) {
  const productidx = this.wishList.lists[0].item.findIndex((ListProduct) => {
    return ListProduct.productID.toString() === product._id.toString();
  });
  console.log(productidx)
  if(productidx<0){
     this.wishList.lists[0].item.push({
      productID:product._id
     })
  }
  else{
    //product already in wishList
  }
  return this.save()
}
user.methods.addProducttorandomWishList = function (product,listName) {
   const listidx=this.wishList.lists.findIndex((List)=>{
    return List.name.toString()===listName.toString()
   })
   if(listidx>=0){
    const productidx=this.wishList.lists[listidx].item.findIndex((ListProduct)=>{
      return ListProduct.productID.toString()=== product._id.toString()
    })
    if(productidx<0){
        this.wishList.lists[listidx].item.push({
          productID:product._id
        })
    }
    else{
      //Product already exists
    }
  }
  else{
    //List donot exist
  }
   return this.save()
}
user.methods.deleteProductfromwishList = function(listName,productId){
  const listidx=this.wishList.lists.findIndex((List)=>{
    return List.name.toString()===listName.toString()
   })
   console.log(listidx)
   if(listidx>=0){
    const updatedwishList=this.wishList.lists[listidx].item.filter((item)=>{
      return item.productID.toString() !== productId.toString();
    })
    this.wishList.lists[listidx].item = updatedwishList
   }
   return this.save()
}
user.methods.deletewishList = function(listName){
    const updatedList=this.wishList.lists.filter((list)=>{
      return list.name.toString() !==listName.toString()
    })
    this.wishList.lists=updatedList
    return this.save()
}
user.methods.emptyCart = function(){
  this.cart={items:[]}
  return this.save()
}
user.methods.isSellerfunc =function(){
  this.isSeller=true
  return this.save()
}
user.methods.isInfluencerFunc=function()
{
  this.isInfluencer=true;
  return this.save();
}
module.exports = mongoose.model("User", user);
