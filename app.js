var express = require('express');
var path = require('path');
var ejs=require('ejs')

var app = express();
const sellerdashboardRoutes=require('./routes/sellerDashboardRoutes')
const influencerBlogRoutes=require('./routes/influencerBlogPageRoutes')
const wishlistroute=require('./routes/wishlistRoutes')
const productPageRoutes=require('./routes/productPage')
const productSearchPage=require('./routes/productSearchpage')
const returnsOrderPage=require('./routes/returnsAndorder')
const dashboardUserPage=require('./routes/dashboardUser')
const index=require('./routes/index.js')
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/index', (req, res, next) => {
//   res.render('index.ejs');
// })
app.use(index);
app.use(influencerBlogRoutes)
app.use(sellerdashboardRoutes)
app.use(wishlistroute)
app.use(productPageRoutes)
app.use(productSearchPage)
app.use(returnsOrderPage)
app.use(dashboardUserPage)
// app.use('/',(req,response)=> 
// {
//   response.render('LandingPage/product-card-slider.ejs');
// });
// app.use('/returnsAndOrders',(req,res)=>{
//   res.render('returnsAndOrders.ejs')
// });

// app.use('/',(req,res)=>{
//   res.render('index.ejs')
// });
// app.use('/productPage',(req,res)=>{
//   res.render('productPage.ejs')
// });
// app.use('/productSearchPage',(req,res)=>{
//   res.render('productSearchPage.ejs')
// });
// app.use('/sellerDashboard',(req,res)=>{
//   res.render('sellerDashboard.ejs')
// });
// app.use('/wishList',(req,res)=>{
//   res.render('wishList.ejs')
// });
// app.use('/influencerBlog',(req,res)=>{
//   res.render('influencerBlog.ejs')
// });

app.listen(3000);
