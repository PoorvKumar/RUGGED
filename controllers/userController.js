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
            var listidx;
            var currentList;
            if (!req.query.wname) {
              listidx = 0;
              if (req.user.wishList.lists[0]) {
                currentList = req.user.wishList.lists[0].name;
              } else {
                currentList = "";
              }
            } else {
              listidx = req.user.wishList.lists.findIndex((ans) => {
                return ans.name.toString() === req.query.wname;
              });
              currentList = req.query.wname;
            }
            req.user
              .populate("wishList.lists.item.productID")
              .then((user) => {
                var listProducts = [];
                if (user.wishList.lists[listidx]) {
                  listProducts = user.wishList.lists[listidx].item;
                }
                res.render("wishList", {
                  pgTTL: "wishList",
                  product: listProducts,
                  isLoggedin: req.session.isLoggedin,
                  user: req.session.user,
                  cartprod: cartproducts,
                  wishLists: req.user.wishList.lists,
                  currentList: currentList,
                });
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      } 
      else 
      {
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
        res.render("userDashboard2", {
          pageTitle: "User DashBoard",
          user: req.session.user,
          isLoggedin: req.session.isLoggedin,
          cartprod: cartproducts
        });
      })
      .catch((err) => console.log(err));
  } else {
    res.render("userDashboard2", {
      pageTitle: "User DashBoard",
      // user: req.session.user,
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
      req.session.user = updatedUser;
      res.redirect("/userDashboard");
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("EError Updating user");
    });
};
exports.deleteUser = (req, res) => {
  const userId = req.user._id;
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
  const prodId = req.body.productID;
  Product.findById(prodId)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then((result) => {
      console.log(result);
      res.redirect("/");
    });
};
exports.postDeleteCart = (req, res, next) => {
  const prodId = req.body.productID;
  req.user
    .removeFromCart(prodId)
    .then((result) => {
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};
exports.postcreatewishList = (req, res, next) => {
  const listName = req.body.listName;
  req.user.createWishList(listName).then((result) => {
    res.redirect("/wishList");
  });
};
exports.postaddproductinDefaultList = (req, res, next) => {
  if (req.user.wishList.lists[0]) {
    const prodId = req.body.productID;
    Product.findById(prodId)
      .then((product) => {
        return req.user.addProductinWishList(product);
      })
      .then((result) => {
        console.log(result);
        res.redirect("/wishList");
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    res.redirect("/wishList");
  }
};
exports.postaddproductinrandomList = (req, res, next) => {
  const listName = req.body.listName;
  const prodId = req.body.productID;
  console.log(prodId)
  Product.findById(prodId)
    .then((product) => {
      return req.user.addProducttorandomWishList(product,listName);
    })
    .then((result) => {
      res.redirect("/wishList");
    });
};
exports.postdeleteproductfromwishList = (req, res, next) => {
  const listName = req.body.listName;
  const prodId = req.body.productID;
  req.user
    .deleteProductfromwishList(listName, prodId)
    .then((result) => {
      res.redirect("/wishList");
    })
    .catch((err) => console.log(err));
};
exports.postdeletewishList = (req, res, next) => {
  const listName = req.body.listName;
  req.user
    .deletewishList(listName)
    .then((result) => {
      res.redirect("/wishList");
    })
    .catch((err) => console.log(err));
};

