const Influencer=require("../models/influencer");

exports.getInfluencerDash=(req,res)=>
{
  res.render("influencerDashboard", {
    pageTitle: "Influencer DashBoard",
    user: req.session.user,
    isLoggedin: req.session.isLoggedin
  });
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