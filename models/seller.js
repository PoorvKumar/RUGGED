const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const Seller=new Schema(
    {
        userId:
        {
            type: Schema.Types.ObjectId,
            required: true,
            ref:'User'
        },
        gst:{
            type:String,
            required:true
        },
        accountNumber:{
            type:String,
            required:true
        },
        companyname:{
            type:String,
             required:true
        },
        products:[
            {
                productId:{
                    type: Schema.Types.ObjectId,
                    ref:'Product'
                },
                Revenue:{
                   type:Number,
                }
            }
        ]
        
    }
)
Seller.methods.addproduct = function(product){
    this.products.push(product)
    return this.save()
}
module.exports = mongoose.model('Seller', Seller);