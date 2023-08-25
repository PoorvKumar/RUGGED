const Product = require("../models/product");
const Seller = require("../models/seller");
const Order=require("../models/orders")
const bcrypt = require("bcryptjs");
const User = require("../models/user");
exports.getAddProduct = (req, res, next) => {
  if (req.session.isLoggedin) {
    req.user
      .populate("cart.item.productID")
      .then((user) => {
        const cartproducts = user.cart.item;
        res.render("add-product", {
          pageTitle: "Add Product",
          user: req.session.user,
          isLoggedin: req.session.isLoggedin,
          cartprod: cartproducts,
        });
      })
      .catch((err) => console.log(err));
  } else {
    res.render("add-product", {
      pageTitle: "Add Product",
      user: { firstname: "User" },
      isLoggedin: req.session.isLoggedin,
    });
  }
};
exports.postAddProduct = (req, res, next) => {
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    discount: req.body.discount,
    company: req.body.company,
    dimension: req.body.dimension,
    weight: req.body.weight,
    colors: req.body.colors,
    brand: req.body.brand,
    tags: req.body.tags,
    categories: req.body.categories,
    photos: req.body.imageurl,
    table: req.body.table,
    quantity: req.body.quantity,
  });
  product
    .save()
    .then((result) => {
      // console.log(result);
      res.redirect("/add-product");
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.getsellerdashBoard = (req, res, next) => {
  if (req.session.isLoggedin) {
    req.user
      .populate("cart.item.productID")
      .then((user) => {
        const cartproducts = user.cart.item;
        Product.find({sellerID:req.user._id}).then(products=>{
          noOfProducts=products.length
          Total=0
          for(let product of products){
              Total+=product.price
          }
          Profit=0.2*Total
          res.render("sellerDashboard", {
            pageTitle: "SellerDashboard",
            isLoggedin: req.session.isLoggedin,
            cartprod: cartproducts,
            user: req.session.user,
            noOfProducts:noOfProducts,
            sellprod:products.reverse(),
            profit:Profit,
            revenue:Total
          });
        }).catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  } else {
    res.render("sellerDashboard", {
      pageTitle: "SellerDashboard",
      user: { firstname: "User" },
      isLoggedin: req.session.isLoggedin,
    });
  }
};
exports.getsellerPortal = (req, res, next) => {
  if (req.session.isLoggedin) {
    req.user
      .populate("cart.item.productID")
      .then((user) => {
        const cartproducts = user.cart.item;
        res.render("sellerPortal", {
          pageTitle: "SellerDashboard",
          isLoggedin: req.session.isLoggedin,
          user: req.session.user,
          cartprod: cartproducts,
        });
      })
      .catch((err) => console.log(err));
  } else {
    res.render("sellerPortal", {
      pageTitle: "SellerDashboard",
      user: { firstname: "User" },
      isLoggedin: req.session.isLoggedin,
    });
  }
};
exports.SellerGetProduct = (req, res) => {
  if(req.user.isSeller){
    Product.find({sellerID:req.user._id}).then(products=>{
      res.render("partials/sellerDashboard/pages/product.ejs", {
        user: req.session.user,
        isLoggedin: req.session.isLoggedin,
        pageTitle: "Product Page",
        products:products
      });
    }).catch(err=>{
      console.log(err)
    })
}
};
exports.SellerGetRegister = (req, res) => {
  res.render("sellerRegister", {
    user: req.session.user,
    pageTitle: "Seller Register",
  });
};
exports.SellerPostRegister = (req, res) => {
  bcrypt
    .compare(req.body.password, req.user.password)
    .then((check) => {
      if (check) {
            const seller = new Seller({
              userId: req.user._id,
              gst: req.body.gstno,
              accountNumber: req.body.accountno,
              companyname: req.body.companyname,
              products: [],
            });
            seller
              .save()
              .then((result) => {
                req.user
                .isSellerfunc()
                .then((result) => {
                res.redirect("/dashboardSeller");
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => console.log(err));
      } else {
        res.redirect("/");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
// render add product form
exports.SellerGetAddProduct = (req, res) => {
  res.render("partials/sellerDashboard/pages/addproduct.ejs", {
    user: req.session.user,
    isLoggedin: req.session.isLoggedin,
    pageTitle: "Influencer Dash | Add Product Page",
  });
};
//add product seller dash
exports.sellerAddProduct = (req, res) => {
  let dPrice = req.body.price * (1 - 0.01 * req.body.discount);
  categories=String(req.body.cate).split(',');
  // console.log(req.body.imagesURL);
  imgurl=String(req.body.imageURL).split(',');
  tgs=String(req.body.tags).split(',');
  let dimension= {
    length: {
      type: Number,
    },
    width: {
      type: Number,
    },
    height: {
      type: Number,
    },
  };
  dimension.length = req.body.Length;
  dimension.width = req.body.Width;
  dimension.height= req.body.Height;

  services=[0,0,0,0];
  if(req.body.service0==='on')
  {
    services[0]=1;
  }
  if(req.body.service1==='on')
  {
    services[1]=1;
  }
  if(req.body.service2==='on')
  {
    services[2]=1;
  }
  if(req.body.service3==='on')
  {
    services[3]=1;
  }
  
  console.log(services);
  const product = new Product({
    sellerID: req.user._id,
    name: req.body.name,
    shortDescription: req.body.shortDesc,
    categories: categories, //array
    brand: req.body.brand,
    price: req.body.price,
    quantity: req.body.stockQuantity,
    discount: req.body.discount,
    discountedPrice: dPrice,
    description: req.body.description,
    imagesURL: imgurl, //array
    tags: tgs, //array
    colors: req.body.colors, 
    dimension:dimension,
    weightInKg:req.body.Weight,
    services:services,
  });


  product
    .save()
    .then((result) => {
      Product
      res.redirect("/dashboardSeller/products");
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Server Error");
    });
};
exports.postdeleteproduct =(req,res,next)=>{
   
  Product.findByIdAndDelete({ _id: req.body.productID })
    .then(() => {
          res.redirect("dashboardSeller/products");
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error Deleting user");
    });
}
