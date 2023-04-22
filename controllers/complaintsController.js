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
      res.redirect('/');
    })
    .catch(err=>
      {
        console.error(err);
        res.status(500).send("Server Error");
      })
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