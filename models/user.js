const mongoose=require('mongoose')
const Schema=mongoose.Schema
const user=new Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    phoneno:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    address:{
        type:String
    },
    cart:{
        item:[
            {
                productID: {type: Schema.Types.ObjectId, ref:'Product',required:true},
                quantity: {type: Number, required:true}
            }
        ]
    }
});
user.methods.addToCart=(product)=>{
    //Checking if product is already in the cart
    const productidx=this.cart.find(cartProduct => cartProduct.productID.toString()===product._id.toString())
    const updatedCart=[...this.cart.item] //Making shallow copy (one object two different instance pointing to it)
    if(productidx<0){
      updatedCart.push({productID:product._id,quantity:1})
    }  
    this.cart={item:updatedCart}
    return this.save()
}

module.exports=mongoose.model('User',user);