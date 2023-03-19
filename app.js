var express = require('express');
var path = require('path');
var ejs=require('ejs')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', (req, res, next) => {
  res.render('productSearchPage.ejs');
})
// app.use('/',(req,response)=>
// {
//   response.render('LandingPage/product-card-slider.ejs');
// });
app.listen(3000);
