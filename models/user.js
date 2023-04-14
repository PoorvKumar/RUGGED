const mongoose=require('mongoose')
const Schema=mongoose.Schema
const user=new Schema({
    name:{
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
    username:{
        type:String
    },
    password:{
        type:String,
        required:true
    },
    address:{
        type:String
    }
})
module.exports=mongoose.model('User',user)