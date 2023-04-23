const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const order = new Schema(
  {products: [
    {
      product: { type: Object, required: true },
      quantity: { type: Number, required: true }
    }
  ],
  user: {
    firstname: {
      type: String,
      required: true
    },
    lastname: {
        type:String,
        required:true
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    }
  },
  date:{
    type: Date,
    default: Date.now
  },
  Status:{
    type: String,
    required:true,
  }
}
);
order.methods.CancelOrder= function(){
    this.Status="Cancel"
    return this.save()
}
order.methods.ShipOrder = function (){
       this.Status="Placed"
       return this.save()
}
module.exports=mongoose.model('Order',order);
