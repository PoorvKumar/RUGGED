const User=require('../models/user');
const Seller=require('../models/seller');
const Influencer=require('../models/influencer');
const Product=require('../models/product');
const Orders=require('../models/orders');
const Complaints=require('../models/complaints');

exports.getAdminPage=(req,res)=>
{
    res.render('admin',
    { 
        pageTitle: "Admin DashBoard",
        user: req.session.user,
        isLoggedin: req.session.isLogged
     });
}