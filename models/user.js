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
    cart:
    {
        type:subSchema,
        default:{}
    },
    order

})
module.exports=mongoose.model('User',user)