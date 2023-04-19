const Product=require('../models/product')
let products1,products2,products3;
exports.getLandingpage=(req,res,next)=>{
    Product.find({categories:'Shoes'})
    .then(product=>{
        products1=product
    Product.find({categories:'Shoes'})
    .then(product=>{
        products2=product
    Product.find({categories:'Shoes'})
    .then(product=>{
        products3=product
        if(!req.session.isLoggedin){
            res.render('index',{
                pageTitle:'RUGGED',
                isLoggedin:req.session.isLoggedin,
                prod:products2
            })}
            else{
                res.render('index',{
                    pageTitle:'RUGGED',
                    isLoggedin:req.session.isLoggedin,
                    user:req.session.user,
                    prod:products3
                })
            }

    })
    .catch(err=>{
        console.log(err)
    })
    })
    .catch(err=>{
        console.log(err)
    })
    })
    .catch(err=>{
        console.log(err)
    })

      
}