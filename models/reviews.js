const { Int32 } = require('mongodb')
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const reviews = new Schema({
    // _id:{
    //   type:String
    // },
    productID: {
        // type: String,
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    ratingAvg: {
        type: float,
    },
    ratingArray: [
        {
            stars: {
                type: Int32,
                min: 0,
                max: 5
            },
            numberOfPeople: {
                type: Int32,
            }
        },
    ],
    reviewsArray: [
        {
            review: {
                userID: {
                    type: Schema.Types.ObjectId,
                    ref: "User",
                    required: true,
                },
                title: {
                    type: String,
                },
                photoURLS: [
                    {
                        photoURL: {
                            type: String,
                        }
                    }
                ],
                rating: {
                    type: Int32,
                    required: true
                },
                description: {
                    type: String,
                }
            }
        }
    ]
});
// reviews.methods.getAvg=()=>{}