const Product = require("../models/product");
const Order = require("../models/orders");
exports.getProductInfo = (req, res) => {
  // const productId=req.params.productId;
  const productId = req.query.id;
  // function getProductsRatingArray(products) {
  //   let productsRatingArray = [
  //     // {
  //     //   productID: String,
  //     //   ratingArray: [],
  //     // },
  //   ];
  //   for (let index = 0; index < products.length; index++) {
  //     productsRatingArray.push({
  //       productID: products[index]._id.toString(),
  //       ratingArray: [0, 0, 0, 0, 0, 0],
  //     });
  //   }
  //   for (let index = 0; index < products.length; index++) {
  //     let product = products[index];
  //     let prai = productsRatingArray[index];
  //     for (let j = 0; j < product.reviewsArray.length; j++) {
  //       prai.ratingArray[product.reviewsArray[j].rating] =
  //         prai.ratingArray[product.reviewsArray[j].rating] + 1;
  //     }
  //   }
  //   return productsRatingArray;
  // }
  function getProductsRatingArray(products) {
    productsRatingArray = [
      // {
      //   productID: String,
      //   ratingArray: [],
      // },
    ];
    for (let index = 0; index < products.length; index++) {
      productsRatingArray.push({
        productID: products[index]._id.toString(),
        ratingArray: [0, 0, 0, 0, 0, 0],
      });
    }
    for (let index = 0; index < products.length; index++) {
      let product = products[index];
      for (let j = 0; j < product.reviewsArray.length; j++) {
        productsRatingArray[index].ratingArray[product.reviewsArray[j].rating]++;
      }
    }
    // console.log(productsRatingArray);
    return productsRatingArray;
  }
  //fetch data from database using productId
  Product.findById(productId)
    .then((product) => {
      //Render Product Page with Data
      const productsRatingArray = getProductsRatingArray([product]);
      if (req.session.isLoggedin) {
        req.user
          .populate("cart.item.productID")
          .then((user) => {
            const cartproducts = user.cart.item;
            res.render("productPage", {
              productData: product,
              productRating: productsRatingArray[0],
              user: req.session.user,
              isLoggedin: req.session.isLoggedin,
              pgTitle: product.name,
              cartprod: cartproducts,
              wishList: req.user.wishList.lists,
            });
          })
          .catch((err) => console.log(err));
      } else {
        res.render("productPage", {
          productData: product,
          productRating: productsRatingArray[0],
          user: req.session.user,
          isLoggedin: req.session.isLoggedin,
          pgTitle: product.name,
        });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Server Error");
      return;
    });
};
exports.getOrderDetails = (req, res, next) => {
  req.user
    .populate("cart.item.productID")
    .then((user) => {
      const cartproducts = user.cart.item;
      Order.find({ "user.userId": req.user._id })
        .then((orders) => {
          Order.find({ "user.userId": req.user._id, Status: "Not Shipped" })
            .then((notshippedOrders) => {
              Order.find({ "user.userId": req.user._id, Status: "Placed" })
                .then((buyAgain) => {
                  res.render("returnsAndOrders", {
                    isLoggedin: req.session.isLoggedin,
                    cartprod: cartproducts,
                    orders: orders,
                    user: req.session.user,
                    notshippedOrders: notshippedOrders,
                    buyAgain: buyAgain,
                  });
                })
                .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};
exports.postOrder = (req, res, next) => {
  req.user
    .populate("cart.item.productID")
    .then((user) => {
      const products = user.cart.item.map((i) => {
        return { quantity: i.quantity, product: { ...i.productID._doc } };
      });
      if (products.length > 0) {
        const order = new Order({
          products: products,
          user: {
            firstname: req.user.firstname,
            lastname: req.user.lastname,
            userId: req.user._id,
          },
          Status: "Not Shipped",
        });
        return order.save();
      }
    })
    .then((result) => {
      return req.user.emptyCart();
    })
    .then(() => {
      res.redirect("/returnsAndOrder");
    })
    .catch((err) => console.log(err));
};
function getProductsRatingArray(products) {
  productsRatingArray = [
    // {
    //   productID: String,
    //   ratingArray: [],
    // },
  ];
  for (let index = 0; index < products.length; index++) {
    productsRatingArray.push({
      productID: products[index]._id.toString(),
      ratingArray: [0, 0, 0, 0, 0, 0],
    });
  }
  for (let index = 0; index < products.length; index++) {
    let product = products[index];
    for (let j = 0; j < product.reviewsArray.length; j++) {
      productsRatingArray[index].ratingArray[product.reviewsArray[j].rating]++;
    }
  }
  // console.log(productsRatingArray);
  return productsRatingArray;
}
function getAverageRating(product) {
  let ratingArray = [0, 0, 0, 0, 0, 0];
  for (let index = 0; index < product.reviewsArray.length; index++) {
    ratingArray[product.reviewsArray[index].rating] =
      ratingArray[product.reviewsArray[index].rating] + 1;
  }
  let averageRating = 0;
  let sum = 0;
  let totalNumOfPeople = 0;
  for (let index2 = 0; index2 < ratingArray.length; index2++) {
    totalNumOfPeople = totalNumOfPeople + ratingArray[index2];
    sum = sum + index2 * ratingArray[index2];
  }
  if (totalNumOfPeople === 0) {
    totalNumOfPeople = 1;
  }
  averageRating = sum / totalNumOfPeople;
  // console.log(averageRating);
  return averageRating;
}
exports.getFilter = (req, res) => {
  const searchTerm = String(req.query.q);
  const customerRating = req.query.customerRating;
  const brands = req.query.brandSelected;
  // const offerSelected = req.query.offerSelected;
  const priceLL = Number(req.query.pricefrom);
  const priceUL = Number(req.query.priceto);
  const influencersChoice = req.query.InfluencersChoice;
  const ruggerVerified = req.query.RuggedVerrified;
  // const colorSelected = req.query.colour;
  const availability = req.query.availability;
  let pattern=new RegExp(searchTerm,"i");

  Product.find({$or:
    [ 
      { name: { $regex: searchTerm, $options: "i" }}, 
      { categories: { $in: [ pattern ] } },
      { tags: { $in:[ pattern ] } }
  ]})
    .then((products) => {
      const priceFilter = (product) => {
        let priceAfterDiscount = product.price * (1 - product.discount * 0.01);
        return priceAfterDiscount > priceLL && priceAfterDiscount < priceUL;
      };
      const customerRatingFilter = (product) => {
        return getAverageRating(product) >= customerRating;
      };
      const brandFilter = (product) => {
        let index = 0;
        for (index = 0; index < brands.length; index++) {
          if (product.brand === brands[index]) {
            return product.brand === brands[index];
          }
        }
        return product.brand === brands[index];
      };
      // const offerFilter = (product) => {
      //   let index = 0;
      //   let j = 0;
      //   for (index = 0; index < offerSelected.length; index++) {
      //     for (j = 0; j < product.offers.length; j++) {
      //       if (product.offers[j] === offerSelected[index]) {
      //         return product.offers[j] === offerSelected[index];
      //       }
      //     }
      //   }
      //   return product.offerApplied[j] === offerSelected[index];
      // };
      const influencersChoiceFilter = (product) => {
        if (influencersChoice === "on") {
          return product.influencersNameChoice.length > 0;
        }
        return product;
      };
      const ruggedVerrifiedFilter = (product) => {
        return product.ruggedVerrified === "true";
      };
      // const colorFilter = (product) => {
      //   return product.colour === clr;
      // };
      const availabilityFilter = (product) => {
        return product.quantity > 1;
      };

      if (brands) {
        products = products.filter(brandFilter);
      }
      // if (offerSelected.length > 0) {
      //   products = products.filter(offerFilter);
      // }
      if (influencersChoice === "on") {
        products = products.filter(influencersChoiceFilter);
      }
      if (ruggerVerified === "on") {
        products = products.filter(ruggedVerrifiedFilter);
      }
      // if (colorSelected) {
      //   products = products.filter(colorFilter);
      // }
      if (availability === "on") {
        products = products.filter(availabilityFilter);
      }
      if (true) {
        products = products.filter(priceFilter);
      }
      console.log(products);

      if (customerRating >= 0) {
        products = products.filter(customerRatingFilter);
      }
      const productsRatingArray = getProductsRatingArray(products);
      if (req.session.isLoggedin) {
        req.user
          .populate("cart.item.productID")
          .then((user) => {
            const cartproducts = user.cart.item;
            res.render("productSearchPage.ejs", {
              productsData: products,
              user: req.session.user,
              isLoggedin: req.session.isLoggedin,
              searchTerm: searchTerm,
              productsRatingArray: productsRatingArray,
              cartprod: cartproducts,
            });
          })
          .catch((err) => console.log(err));
      } else {
        res.render("productSearchPage.ejs", {
          productsData: products,
          pgTTL: "Products",
          user: req.session.user,
          isLoggedin: req.session.isLoggedin,
          productsRatingArray: productsRatingArray,
          searchTerm: searchTerm
        });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Server Error");
      return;
    });
};
exports.postCancelOrder = (req, res, next) => {
  var orderid = req.body.ordercancel;
  Order.findById(orderid)
    .then((order) => {
      req.order = order;
      req.order
        .CancelOrder()
        .then((result) => {
          res.redirect("/");
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};
exports.postShipOrder = (req, res, next) => {
  var orderid = req.body.ordership;
  Order.findById(orderid)
    .then((order) => {
      req.order = order;
      req.order
        .ShipOrder()
        .then((result) => {
          res.redirect('/admin/orderHistoryAdmin');
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};
exports.postSingleProductOrder = (req, res, next) => {
  prodId = req.body.productID;
  val = req.body.items
  console.log(val)
  Product.find({ _id: prodId })
    .then((products) => {
      var products = [{ quantity: 1, product: products[0] }]
      const order = new Order({
        products: products,
        user: {
          firstname: req.user.firstname,
          lastname: req.user.lastname,
          userId: req.user._id,
        },
        Status: "Not Shipped",
      });
      return order.save();
    }).then(result => {
      res.redirect("/returnsAndOrder")
    })
    .catch((err) => console.log(err));
};
exports.postReview = (req, res) => {

  // let custName = req.body.name;
  let ratingvalue = req.body.ratingval;
  let reviewTitle = req.body.reviewTitle;
  let reviewImageURL = req.body.reviewImageURL;
  let reviewText = req.body.review;
  // let productID = req.body.productID;
  // console.log(productID);
  let pid = req.query.id;
  let uid = req.user._id;
  // let cartproducts = req.body.cartProducts;
  // console.log(cartproducts);
  let ra;
  Product.findById({ _id: pid }).then((product) => {
    ra = product.reviewsArray;
    ra.push({
      userID: uid,
      title: reviewTitle,
      photoURLS: [reviewImageURL],
      rating: ratingvalue,
      description: reviewText,
    });

    Product.findByIdAndUpdate(pid, { reviewsArray: ra }, { new: true }).then((rslt) => {
      const productsRatingArray = getProductsRatingArray([product]);
      if (req.session.isLoggedin) {
        req.user
          .populate("cart.item.productID")
          .then((user) => {
            const cartproducts = user.cart.item;
            res.render("productPage", {
              productData: product,
              productRating: productsRatingArray[0],
              user: req.session.user,
              isLoggedin: req.session.isLoggedin,
              pgTitle: product.name,
              cartprod: cartproducts,
              wishList: req.user.wishList.lists,
            });
          })
          .catch((err) => console.log(err));
      } 
      else {
        res.render("productPage", {
          productData: product,
          productRating: productsRatingArray[0],
          user: req.session.user,
          isLoggedin: req.session.isLoggedin,
          pgTitle: product.name,
        });
      }
    }).catch((error) => {
      if (error) { console.error(error); }
    });
  }).catch((err) => {
    if (err) { console.error(err); }
  });

};