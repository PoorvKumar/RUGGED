const Product=require('../models/product')
exports.getAddProduct = (req, res, next) => {
  if(req.session.isLoggedin){
  req.user
  .populate("cart.item.productID")
  .then((user) => {
    const cartproducts = user.cart.item;
    res.render('add-product', {
      pageTitle: 'Add Product',
      isLoggedin:req.session.isLoggedin,
      cartprod:cartproducts
    });
  })
  .catch((err) => console.log(err));}
  else{
    res.render('add-product', {
      pageTitle: 'Add Product',
      isLoggedin:req.session.isLoggedin
    });
  }
  };
 exports.postAddProduct = (req, res, next) => {
    const product = new Product({
      name:req.body.name,
      price:req.body.price,
      description:req.body.description,
      discount:req.body.discount,
      company:req.body.company,
      dimension:req.body.dimension,
      weight:req.body.weight,
      colors:req.body.colors,
      brand:req.body.brand,
      tags:req.body.tags,
      categories:req.body.categories,
      photos:req.body.imageurl,
      table:req.body.table,
      quantity:req.body.quantity
      });
    product
      .save()
      .then(result => {
        // console.log(result);
        console.log('Created Product');
        res.redirect('/add-product');
      })
      .catch(err => {
        console.log(err);
      });
  };
  exports.getsellerdashBoard=(req,res,next)=>{
    if(req.session.isLoggedin){
    req.user
  .populate("cart.item.productID")
  .then((user) => {
    const cartproducts = user.cart.item;
    res.render('sellerDashboard',{
      pageTitle:'SellerDashboard',
      isLoggedin:req.session.isLoggedin,
      cartprod:cartproducts
    })
  })
  .catch((err) => console.log(err));}
  else{
    res.render('sellerDashboard',{
      pageTitle:'SellerDashboard',
      isLoggedin:req.session.isLoggedin,
    })
  }
  }
  exports.getsellerPortal=(req,res,next)=>{
    if(req.session.isLoggedin){
    req.user
    .populate("cart.item.productID")
    .then((user) => {
      const cartproducts = user.cart.item;
    res.render('sellerPortal',{
      pageTitle:'SellerDashboard',
      isLoggedin:req.session.isLoggedin,
      user:req.session.user,
      cartprod:cartproducts
    })
  })
  .catch((err) => console.log(err));}
  else{
    res.render('sellerPortal',{
      pageTitle:'SellerDashboard',
      isLoggedin:req.session.isLoggedin,
      user:req.session.user
    })
  }
  }