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

exports.deleteAUserAdmin=(req,res)=>
{
    const customerId=req.query.customerID;

    User.findByIdAndDelete({_id:customerId})
    .then(()=>
    {
        res.redirect("/admin");
    })
    .catch(err=>
        {
            console.error(err);
            res.status(500).send("Server Error");
        })
}

exports.getOrdersInfo=(req,res)=>
{
    Orders.find()
    .then(result=>
        {
            res.render('./partials/adminDashBoard/pages/order.ejs',
            {
                pageTitle: "Orders History",
                user: req.session.user,
                isLoggedin: req.session.isLoggedin,
                orders: result
            });
        })
    .catch(err=>
        {
            console.error(err);
            res.status(500).send("Server Error");
        })
}

exports.getComplaintsAdmin=(req,res)=>
{
    Complaints.find()
    .then(result=>
        {
            res.render('./partials/adminDashBoard/pages/complaints.ejs',
            {
                pageTitle: "Complaints History",
                user: req.session.user,
                isLoggedin: req.session.isLoggedin,
                complaints: result
            });
        })
        .catch(err=>
            {
                console.error(err);
                res.status(500).send("Server Error");
            })
}

exports.resolveComplaintAdmin=(req,res)=>
{
    const complaintId=req.query.complaintID;

    Complaints.findByIdAndUpdate({_id:complaintId},{ resolved: true},{ new: true })
    .then(result=>
        {
            res.redirect("/admin/complaints");
        })
    .catch(err=>
        {
            console.error(err);
            res.status(500).send("Server Error");
        })
}

exports.getInfluencersInfo=(req,res)=>
{
    User.find({ isInfluencer: true })
    .then(result=>
        {
            // console.log(result);
            res.render("./partials/adminDashBoard/pages/influencers.ejs",
            {
                pageTitle: "Influencers Info",
                user: req.session.user,
                issLoggedin: req.session.isLoggedin,
                influencers: result
            })
        })
    .catch(err=>
        {
            console.error(err);
            res.status(500).send("Server Error");
        })
}

exports.removeInfluencerAdmin=(req,res)=>
{
    const userId=req.query.userID;
    // const userId=req.body.i;

    Influencer.findByIdAndDelete(userId)
    .then(result=>
        {
            User.findByIdAndUpdate({ _id: userId },{ isInfluencer: false },{ new: true })
            .then(()=>
            {
                res.redirect('/admin/influencers');
            })
            .catch(err=>
            {
                console.error(err);
                res.status(500).send("Server Error");
            })
        })
    .catch(err=>
        {
            console.error(err);
            res.status(500).send("Server Error");
        })
}

exports.getSellersInfo=(req,res)=>
{
    User.find({ isSeller: true })
    .then(result=>
        {
            // console.log(result);
            res.render("./partials/adminDashBoard/pages/sellers.ejs",
            {
                pageTitle: "Influencers Info",
                user: req.session.user,
                issLoggedin: req.session.isLoggedin,
                sellers: result
            })
        })
    .catch(err=>
        {
            console.error(err);
            res.status(500).send("Server Error");
        })
}

exports.removeSellerAdmin=(req,res)=>
{
    const userId=req.query.userID;
    // const userId=req.body.i;

    Seller.findByIdAndDelete(userId)
    .then(result=>
        {
            User.findByIdAndUpdate({ _id: userId },{ isSeller: false },{ new: true })
            .then(()=>
            {
                res.redirect('/admin/sellers');
            })
            .catch(err=>
            {
                console.error(err);
                res.status(500).send("Server Error");
            })
        })
    .catch(err=>
        {
            console.error(err);
            res.status(500).send("Server Error");
        })
}