const Product=require('../models/product')
exports.getAddProduct = (req, res, next) => {
    res.render('add-product', {
      pageTitle: 'Add Product'
    });
  };
 exports.postAddProduct = (req, res, next) => {
    const name = req.body.name;
    const imageurl = req.body.imageurl;
    const price = req.body.price;
    const description = req.body.description;
    const discount = req.body.discount;
    const product = new Product(
      name,
      price,
      description,
      discount,
      imageurl
    );
    product
      .save()
      .then(result => {
        // console.log(result);
        console.log('Created Product');
        res.redirect('add-product');
      })
      .catch(err => {
        console.log(err);
      });
  };