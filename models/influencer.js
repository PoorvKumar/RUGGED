const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const Influencer=new Schema(
    {
        userId:
        {
            type: Schema.Types.ObjectId,
            require: true
        },
        posts:
        [
            {
                title:
                {
                    type: String,
                    required: true
                },
                postBody:
                {
                    type: String,
                    require: true
                }
            }
        ]
    }
);

module.exports=mongoose.model('Influencer',Influencer);