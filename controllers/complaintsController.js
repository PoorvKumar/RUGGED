const complaints =require('../models/complaints');

exports.postComplaints = (req, res, next) => {
    title = req.body.title;
    phone = req.body.phn;
    email = req.body.email;
    description=req.body.description;
    userid = req.user._id;

    const complain = new complaints({
      title: title,
      phoneno: phone,
      email: email,
      description: description,
      resolved : false,
      userid:userid,
    });

    complain.save()
    .then(()=>
    {
      if (!req.session.isLoggedin) 
      {
        res.render('index', {
          pageTitle: 'RUGGED',
          user: req.session.user,
          isLoggedin: req.session.isLoggedin,
          // prod: products2
        });
      }
      else 
      {
        req.user
          .populate('cart.item.productID')
          .then(user => {
            const cartproducts = user.cart.item;
            // console.log(cartproducts)
            res.render('index', {
              pageTitle: 'RUGGED',
              isLoggedin: req.session.isLoggedin,
              user: req.session.user,
              cartprod: cartproducts,
              cartquantity: 10
            });
          }
    
          )
          .catch(err => console.log(err));
    
      }
    });
}

exports.getContactUs=(req,res)=>
{
  res.render('contactus',{ pageTitle: "Contact Us"});
}

exports.getAboutUs=(req,res)=>
{
  res.render('aboutus',{ pageTitle: "About Us"});
}
    

exports.showComplaints=(req,res,next)=>{
  userId = req.user._id;

  Complaint.find({userid: userid})
  .then(complaints=>
    {
      console.log(complaints);
      // res.render('complaint',{ pageTitle:"Complaint" , isLoggedin:req.session.isLoggedin});
    })
    .catch(err=>
      {
        console.error(err);
        res.status(500).send("Server Error");
      })
}