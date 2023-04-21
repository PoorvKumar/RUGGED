const Product = require("../models/product");
exports.getProductInfo = (req, res) => {
  // const productId=req.params.productId;
  const productId = req.query.id;

  //fetch data from database using productId
  Product.findById(productId)
    .then((products) => {
      //Render Product Page with Data
      if (req.session.isLoggedin) {
        req.user
          .populate("cart.item.productID")
          .then((user) => {
            const cartproducts = user.cart.item;
            res.render("productPage", {
              products: products,
              user: req.session.user,
              isLoggedin: req.session.isLoggedin,
              pgTitle: products.name,
              cartprod: cartproducts,
              wishList: req.user.wishList.lists,
            });
          })
          .catch((err) => console.log(err));
      } else {
        res.render("productPage", {
          products: products,
          user: req.session.user,
          isLoggedin: req.session.isLoggedin,
          pgTitle: products.name,
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
      res.render("returnsAndOrders", {
        isLoggedin: req.session.isLoggedin,
        cartprod: cartproducts,
        user: req.session.user,
      });
    })
    .catch((err) => console.log(err));
};
