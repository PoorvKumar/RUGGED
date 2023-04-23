const User=require('../models/user');
const Seller=require('../models/seller');
const Influencer=require('../models/influencer');
const Product=require('../models/product');
const Orders=require('../models/orders');
const Complaints=require('../models/complaints');

exports.getAdminPage=(req,res)=>
{
    User.find()
    .then(result=>
        {
            res.render('admin',
            { 
                pageTitle: "Admin DashBoard",
                user: req.session.user,
                isLoggedin: req.session.isLogged,
                customers:result
            });
        })
    .catch(err=>
        {
            console.error(err);
            res.status(500).send("Server Error");
        })
}