const Product=require('../models/product');
const User=require("../models/user");

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
    // const userId=req.params.id;
    // console.log(userId);
    res.render('userDashboard',{ pgTTL:'User DashBoard', user:req.session.user, isLoggedin: req.session.isLoggedin });
}

exports.updateUserPost=(req,res)=>
{
    const userId=req.query.id;
    // const updatedUserData=req.body;
    const updatedUserData=
    {
        firstname:req.body.First,
        lastname:req.body.Last,
        phoneno:req.body.Phone,
        email:req.body.email,
        address:req.body.Address,
        adddressAlt:req.body.AddressAlt,
        state:req.body.state,
        country:req.body.country,
    }
    console.log(updatedUserData);

    User.findByIdAndUpdate(userId,updatedUserData,{ new:true })
    .then(updatedUser=>
        {
            res.render('userDashboard',{ pgTTL:'User DashBoard', user:updatedUser, isLoggedin: req.session.isLoggedin });
        })
    .catch(err=>
        {
            console.error(err);
            res.status(500).send("EError Updating user");
        });
}