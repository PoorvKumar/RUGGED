// const { Int32 } = require('mongodb')
const { Int32 } = require('mongodb');
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const product = new Schema({
  // _id:{
  //   type:String
  // },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  shortDescription: {
    type: String,
    required: true
  },
  discount: {
    type: Number,
    required: true
  },
  discountedPrice: {
    type: Number
  },
  dimension: {
    length: {
      type: Number,
    },
    width: {
      type: Number,
    },
    height: {
      type: Number,
    },
  },
  weightInKg: {
    type: Number,
  },
  colors: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  tags: {
    type: String,
    required: true
  },
  imagesURL: [{
    imageURL: {
      type: String
    }
  }],
  table: {
    type: String
  },
  reviewsArray: [
    {
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
        type: Number,
        required: true
      },
      description: {
        type: String,
      }
    }
  ],
  quantity: {
    type: Number,
    required: true
  },
  sellerID: {
    type: String,
    required: true,
  },
  ruggedVerrified: {
    type: String,
    // required: true
  },
  offers: [
    {
      type: String
    }
  ],
  influencersNameChoice: [
    {
      influencerID: {
        type: Schema.Types.ObjectId,
        ref: "Influencer",
        // required: true,
      },
    }
  ]
});

// product.methods.getRatingArray = (product) => {
//   ratingArray: [
//     {
//       stars: {
//         type: Number,
//         min: 0,
//         max: 5
//       },
//       numberOfPeople: {
//         type: Number,
//       },
//     }
//   ];
//   for (let index = 0; index < product.reviewsArray.length; index++) {
//     ratingArray[product.reviewsArray[index].rating].numberOfPeople = ratingArray[product.reviewsArray[index].rating].numberOfPeople + 1;
//   }
//   return ratingArray;
// };

// product.methods.getAverageRating = (product) => {
//   ratingArray: [
//     {
//       stars: {
//         type: Number,
//         min: 0,
//         max: 5
//       },
//       numberOfPeople: {
//         type: Number,
//       },
//     }
//   ];
//   for (let index = 0; index < product.reviewsArray.length; index++) {
//     ratingArray[product.reviewsArray[index].rating].numberOfPeople = ratingArray[product.reviewsArray[index].rating].numberOfPeople + 1;
//   }
//   let averageRating = 0;
//   let sum = 0;
//   let totalNumOfPeople = 0;
//   for (let index2 = 0; index2 < ratingArray.length; index2++) {
//     totalNumOfPeople = totalNumOfPeople + ratingArray[index2].numberOfPeople;
//     sum = sum + (ratingArray[index2].stars + ratingArray[index2].numberOfPeople);
//   }
//   averageRating = float(sum / totalNumOfPeople);
//   return averageRating;
// }

module.exports = mongoose.model('Product', product);
