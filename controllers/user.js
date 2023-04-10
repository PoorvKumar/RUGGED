const Product=require('../models/product')
exports.getwishList=(req,res,next)=>{
    Product.fetchAll()
    .then(products=>{
        res.render('wishList',{
            product:products,
            pgTTL:'wishList'
        })
    })
}
