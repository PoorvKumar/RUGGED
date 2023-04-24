const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const Influencer=new Schema(
    {
        userId:
        {
            type: Schema.Types.ObjectId,
            required: true,
            ref:'User'
        },
        firstname:
        {
            type:String,
            required:true
        },
        lastname:
        {
            type:String,
            required:true
        },
        posts:
        [
            {
                title:
                {
                    type: String,
                    // required: true
                },
                postBody:
                {
                    type: String,
                    // require: true
                },
                imageURL:
                {
                    type:String,
                    default:"/LOGO/newLOGOTest/newLOGO_no_background.png"
                },
                date:{
                    type:Date,
                    default:Date.now()
                }
            }
        ],
        fb:
        {
            type: String,
            require: true
        },
        insta:
        {
            type: String,
            require: true
        },
        twitter:
        {
            type: String,
            require: true
        },
    }
);

module.exports=mongoose.model('Influencer',Influencer);