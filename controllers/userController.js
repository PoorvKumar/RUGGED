const Product=require('../models/product')
exports.getwishList=(req,res,next)=>{
    Product.find()
    .then(products=>{
        res.render('wishList',{
            product:products,
            pgTTL:'wishList',
            isLoggedin:req.session.isLoggedin,
            user:req.session.user
        })
    })
}
