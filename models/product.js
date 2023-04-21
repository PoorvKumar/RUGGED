const { Int32 } = require('mongodb')
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
  discount: {
    type: Number,
    required: true
  },
  dimension: {
    length: {
      type: Int32,
      required: true
    },
    width: {
      type: Int32,
      required: true
    },
    height: {
      type: Int32,
      required: true
    },
  },
  weight: {
    type: String,
    required: true
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
  photosURLS: [{
    photoURL: {
      type: String
    }
  }],
  table: {
    type: String,
    required: true
  },
  // reviewID: {
  //     type: Schema.Types.ObjectId,
  //     ref: "Reviews",
  //     required: true
  // },
  // review:{
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
        type: Int32,
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
    type: String
  },
  ruggedVerrified: {
    type: String,
    required: true
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
        required: true,
      },
    }
  ]
});

product.methods.getRatingArrayandAverageRating = (product) => {
  ratingArray: [
    {
      stars: {
        type: Int32,
        min: 0,
        max: 5
      },
      numberOfPeople: {
        type: Int32,
      },
    }
  ];
  for (let index = 0; index < product.reviewsArray.length; index++) {
    ratingArray[product.reviewsArray[index].rating].numberOfPeople = ratingArray[product.reviewsArray[index].rating].numberOfPeople + 1;
  }

  let averageRating = 0;
  let sum = 0;
  let totalNumOfPeople = 0;
  for (let index2 = 0; index2 < ratingArray.length; index2++) {
    totalNumOfPeople = totalNumOfPeople + ratingArray[index2].numberOfPeople;
    sum = sum + (ratingArray[index2].stars + ratingArray[index2].numberOfPeople);
  }
  averageRating = float(sum / totalNumOfPeople);
  
  return ratingArray,averageRating;

};




module.exports = mongoose.model('Product', product);
