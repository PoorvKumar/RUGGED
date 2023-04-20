const Product=require('../models/product');

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

exports.getUserDashboard=(req,res)=>
{
    const userId=req.params.id;
    console.log(userId);
    res.render('userDashboard',{ pgTTL:'User DashBoard', user:req.session.user, isLoggedin: req.session.isLoggedin });
}

