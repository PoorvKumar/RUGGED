const Product=require('../models/product')
exports.getLandingpage=(req,res,next)=>{
    Product.find()
    .then(products => {
      if(!req.session.isLoggedin){
        res.render('index',{
            pageTitle:'RUGGED',
            isLoggedin:req.session.isLoggedin,
            product:products
        })}
        else{
            res.render('index',{
                pageTitle:'RUGGED',
                isLoggedin:req.session.isLoggedin,
                user:req.session.user,
                product:products
            })
        }
    });
}