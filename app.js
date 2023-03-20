var express = require('express');
var path = require('path');
var ejs=require('ejs')

var app = express();
const sellerdashboardRoutes=require('./routes/sellerDashboardRoutes')
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/index', (req, res, next) => {
  res.render('index.ejs');
})
app.use(sellerdashboardRoutes)
// app.use('/',(req,response)=> 
// {
//   response.render('LandingPage/product-card-slider.ejs');
// });
app.listen(3000);
