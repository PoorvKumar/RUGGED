const Product=require('../models/product')
exports.getAddProduct = (req, res, next) => {
    res.render('add-product', {
      pageTitle: 'Add Product'
    });
  };
 exports.postAddProduct = (req, res, next) => {
    const name = req.body.name;
    const price = req.body.price;
    const description = req.body.description;
    const discount = req.body.discount;
    const company = req.body.company;
    const dimension = req.body.dimension;
    const weight = req.body.weight;
    const colors = req.body.colors;
    const brand = req.body.brand;
    const tags = req.body.tags;
    const categories = req.body.categories;
    const photos = req.body.photos;
    const table = req.body.table;
    const quantity = req.body.quantity;
    const product = new Product({
      name:name,
      price:price,
      description:description,
      discount:discount,
      company:company,
      dimension:dimension,
      weight:weight,
      colors:colors,
      brand:brand,
      tags:tags,
      categories:categories,
      photos:photos,
      table:table,
      quantity:quantity
      });
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