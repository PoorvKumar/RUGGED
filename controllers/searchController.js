const Product=require("../models/product");

exports.searchRes= (req, res) => {
    const searchTerm = req.query.q;

    // Query MongoDB for products matching the search term
    Product.find({ name: { $regex: searchTerm, $options: 'i' } })
        .then(products => {
            // res.json(products);
            res.render("productSearch",{ products:products , isLoggedin:req.session.isLoggedin });

        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Server Error');
            return;
        });
};