const Influencer=require("../models/influencer");
const bcrypt = require("bcryptjs");

exports.getInfluencerDash=(req,res)=>
{
    Influencer.find({userId: req.user._id})
    .then(result=>
        {
            // console.log(result)
            res.render("influencerDashboard", {
                pageTitle: "Influencer DashBoard",
                user: req.session.user,
                isLoggedin: req.session.isLoggedin,
                influencerData:result[0]
            });
        })
    .catch(err=>
        {
            console.log(err);
        })
  
}

exports.getBlogPost=(req,res)=>
{
    Influencer.find()
    .then(posts => 
    {
        if (!req.session.isLoggedin) 
        {
            res.render('influencerBlog', 
            {
                pageTitle: 'BlogPost',
                user: { firstname: "User "},
                isLoggedin: req.session.isLoggedin,
                post:posts
            })
        }
        else {
            req.user
                .populate('cart.item.productID')
                .then(user => 
                {
                    const cartproducts = user.cart.item;
                Influencer.findOne({userId:req.user._id}).then(result=>{
                    Influencer.find().then(blogposts=>{
                            res.render('influencerBlog', {
                                pageTitle: 'BlogPost',
                                isLoggedin: req.session.isLoggedin,
                                user: req.session.user,
                                posts:posts,
                                cartprod:cartproducts,
                                influencer:result,
                                blogposts:blogposts.reverse()

                            })
                        })
                    .catch(err => 
                        {
                            console.log(err);
                            // res.status(500).send("Server Error");
                        });
                })
                .catch(err => 
                    {
                        console.log(err);
                        // res.status(500).send("Server Error");
                    });
    
            })
                .catch(err => 
                {
                    console.log(err);
                    // res.status(500).send("Server Error");
                });

        }
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send("Server Error");
    });
}

exports.getBecomeInfluencer=(req,res)=>
{
    res.render('becomeInfluencer',
    {
        user: req.session.user,
        isLoggedin: req.session.isLoggedin,
        pageTitle: "Become Influencer"
    });
}

exports.postInfluencerRegister=(req,res)=>
{
    bcrypt.compare(req.body.password,req.user.password)
    .then((check)=>
    {
        if(check)
        {
            const influencer=new Influencer(
                {
                    userId: req.user._id,
                    firstname: req.user.firstname,
                    lastname: req.user.lastname,
                    fb: req.body.fb,
                    insta: req.body.insta,
                    twitter: req.body.twitter,
                    posts: []
                }
            );

            influencer.save()
            .then(result=>
                {
                    req.user.isInfluencerFunc()
                    .then(()=>
                    {
                        res.redirect('/influencerDash');
                    })
                    .catch((err) => {
                        console.log(err);
                      });
                })
            .catch(err=>
                {
                    console.log(err);
                })
        }
        else
        {
            res.redirect('/');
        }
    })
    .catch(err=>
        {
            console.log(err);
        })
}