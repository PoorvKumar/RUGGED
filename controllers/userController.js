const Product = require("../models/product");
const User = require("../models/user");

exports.getwishList = (req, res, next) => {
  Product.find()
    .then((products) => {
      if (req.session.isLoggedin) {
        req.user
          .populate("cart.item.productID")
          .then((user) => {
            const cartproducts = user.cart.item;
            res.render("wishList", {
              product: products,
              pgTTL: "wishList",
              isLoggedin: req.session.isLoggedin,
              user: req.session.user,
              cartprod: cartproducts,
            });
          })
          .catch((err) => console.log(err));
      } else {
        res.render("wishList", {
          product: products,
          pgTTL: "wishList",
          isLoggedin: req.session.isLoggedin,
          user: req.session.user,
        });
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

exports.getUserDashboard = (req, res) => {
  // const userId=req.params.id;
  // console.log(userId);
  if (req.session.isLoggedin) {
    req.user
      .populate("cart.item.productID")
      .then((user) => {
        const cartproducts = user.cart.item;
        res.render("userDashboard", {
          pgTTL: "User DashBoard",
          user: req.session.user,
          isLoggedin: req.session.isLoggedin,
          cartprod:cartproducts
        });
      })
      .catch((err) => console.log(err));
  } else {
    res.render("userDashboard", {
      pgTTL: "User DashBoard",
      user: req.session.user,
      isLoggedin: req.session.isLoggedin,
    });
  }
};

exports.updateUserPost = (req, res) => {
  const userId = req.query.id;
  // const updatedUserData=req.body;
  const updatedUserData = {
    firstname: req.body.First,
    lastname: req.body.Last,
    phoneno: req.body.Phone,
    email: req.body.email,
    address: req.body.Address,
    adddressAlt: req.body.AddressAlt,
    state: req.body.state,
    country: req.body.country,
  };
  console.log(updatedUserData);

  User.findByIdAndUpdate(userId, updatedUserData, { new: true })
    .then((updatedUser) => {
        req.session.user=updatedUser
      res.redirect('/userDashboard')
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("EError Updating user");
    });
};

exports.deleteUser = (req, res) => {
  const userId = req.query.id;
  // console.log(userId);
  // const updatedUserData=req.body;

  User.findOneAndDelete({ _id: userId })
    .then(() => {
      req.session.destroy((err) => {
        if (err) {
          console.log(err);
        } else {
          res.redirect("/");
        }
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error Deleting user");
    });
};
exports.postAddtoCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then((result) => {
      console.log(result);
      res.redirect("/");
    });
};
