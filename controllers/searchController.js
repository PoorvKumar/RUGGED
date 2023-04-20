const Product = require("../models/product");

exports.searchRes = (req, res) => {
  const searchTerm = req.query.q;

  // Query MongoDB for products matching the search term
  Product.find({ name: { $regex: searchTerm, $options: "i" } })
    .then((products) => {
     if(req.session.isLoggedin){
      req.user
        .populate("cart.item.productID")
        .then((user) => {
          const cartproducts = user.cart.item;
          // res.json(products);
          // console.log(products);
          res.render("productSearchPage", {
            productsData: products,
            isLoggedin: req.session.isLoggedin,
            user: req.session.user,
            searchTerm: searchTerm,
            cartprod:cartproducts
          });
        })
        .catch((err) => console.log(err));}
        else{
            res.render("productSearchPage", {
                productsData: products,
                isLoggedin: req.session.isLoggedin,
                user: req.session.user,
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
