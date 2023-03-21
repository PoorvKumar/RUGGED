var express = require('express');
var path = require('path');
var ejs=require('ejs');
const bodyparser=require('body-parser')
const session=require('express-session')
var app = express();
var sqlite3 = require('sqlite3').verbose()
const dbh=new sqlite3.Database('./database/project.db')
const sellerdashboardRoutes=require('./routes/sellerDashboardRoutes');
const influencerBlogRoutes=require('./routes/blogPost');
const wishlistroute=require('./routes/wishlist');
const productPageRoutes=require('./routes/productPage');
const productSearchPage=require('./routes/productSearchpage');
const returnsOrderPage=require('./routes/returnsAndorder');
const dashboardUserPage=require('./routes/dashboardUser');
const sellerPortal=require('./routes/sellerPortal');
const index=require('./routes/index.js');
const login=require('./routes/loginroute')
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
// app.use(bodyparser.json)
app.use(bodyparser.urlencoded({extended:true}))

// app.use('/index', (req, res, next) => {
//   res.render('index.ejs');
// })
//==============================================================
let db = new sqlite3.Database('/project.db',(err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')}})
app.use(session({
    secret:'secret',
    resave:false,
    saveUninitialized:true
}))
// app.post('/login',(req,res)=>{
//     let user = [];
//         Email=req.body.email
//         var sql = `SELECT * FROM Customer WHERE email_id = ?`;
//         db.all(sql, Email, function(err, rows) {
//             if (err){
//                 res.status(400).json({"error": err.message})
//                 return;
//             }

//             rows.forEach(function (row) {
//                 user.push(row);                
//             })
//     if(req.body.password==user[0].password){
//         req.session.user=req.body.email
//         res.redirect('/Blogpost')
//     }
//     else{
//         res.end("Invallid "+user[0].email_id)
//     }
// })
// })
db.each('select * from customer',(err,rows)=>{
    console.log(rows.password)
})
app.use(influencerBlogRoutes);
app.use(sellerdashboardRoutes);
app.use(dashboardUserPage);
app.use(sellerPortal);
app.use(productPageRoutes);
app.use(productSearchPage);
app.use(returnsOrderPage);
app.use(wishlistroute);
app.use(login)
app.use(index)

app.listen(3010)
