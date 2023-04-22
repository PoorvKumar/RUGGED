const Product = require("../models/product");
const Order = require("../models/orders");
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
      Order.find({ "user.userId": req.user._id })
        .then((orders) => {
          Order.find({ "user.userId": req.user._id, Status: "Not Shipped" })
            .then((notshippedOrders) => {
          Order.find({'user.userId': req.user._id,Status:"Placed"}).then(buyAgain=>{
              res.render("returnsAndOrders", {
                isLoggedin: req.session.isLoggedin,
                cartprod: cartproducts,
                orders: orders,
                user: req.session.user,
                notshippedOrders: notshippedOrders,
                buyAgain:buyAgain
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
      if(products.length > 0){
      const order = new Order({
        products: products,
        user: {
          firstname: req.user.firstname,
          lastname: req.user.lastname,
          userId: req.user._id,
        },
        Status: "Placed",
      });
      return order.save();}
    })
    .then((result) => {
      return req.user.emptyCart();
    })
    .then(() => {
      res.redirect("/returnsAndOrder");
    })
    .catch((err) => console.log(err));
};
