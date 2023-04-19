const Product=require("../models/product");
exports.getProductInfo=(req,res)=>
{
    const productId=req.params.productId;

    //fetch data from database using productId
    Product.findById(productId,(err,product)=>
    {
        if(err)
        {
            //Handle error
            console.log(err);
        }
        //Render Product Page with Data
        res.render('productPage',{ product:product , user:req.session.user , isLoggedin:req.session.isLogedin });
    })
}