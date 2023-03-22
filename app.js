const express = require('express');
const app = express();
const path = require('path');
const ejs=require('ejs');

const bodyparser=require('body-parser'); //body-parser
const session=require('express-session'); //express-session

const sqlite3 = require('sqlite3').verbose(); //sqlite3

// const dbh=new sqlite3.Database('./database/project.db');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
// app.use(bodyparser.json)
app.use(bodyparser.urlencoded({extended:true}));

//routing
const sellerdashboardRoutes=require('./routes/sellerDashboardRoutes');
const influencerBlogRoutes=require('./routes/blogPost');
const wishlistroute=require('./routes/wishlist');
const productPageRoutes=require('./routes/productPage');
const productSearchPage=require('./routes/productSearchpage');
const returnsOrderPage=require('./routes/returnsAndorder');
const dashboardUserPage=require('./routes/dashboardUser');
const sellerPortal=require('./routes/sellerPortal');
const index=require('./routes/index.js');
const login=require('./routes/login');
const signup=require('./routes/signup');

// app.use('/index', (req, res, next) => {
//   res.render('index.ejs');
// })
//==============================================================
let db = new sqlite3.Database('./database/project.db', (err) => { //Initialise Connection with in-memory DB
    if (err) {
        // Cannot open database
        console.error(err.message)
        throw err
    } else {
        console.log('Connected to the SQLite database.')
    }
});

app.use(session({
    secret:'secret',
    resave:false,
    saveUninitialized:true
}));
app.post('/login',(req,res)=>{
    let user = [];
        email=req.body.email;
        // email.toLowerCase();
        var sql = "SELECT * FROM Customer WHERE Email_ID = ?";
        db.all(sql, email, function(err, rows) {
            if (err){
                res.status(400).json({"error": err.message})
                return;
            }

            rows.forEach(function (row) {
                user.push(row);                
            })
    if(req.body.email==user[0].Email_ID && req.body.password==user[0].Passwrord){
        // req.session.user=currentUser;
        res.redirect('/');
    }
    else{
        res.end("Invalid Username or Password");
    }
});
});
db.each('select * from customer',(err,rows)=>{
    console.log(rows);
});

//using routes
app.use(index);
app.use(influencerBlogRoutes);
app.use(sellerdashboardRoutes);
app.use(dashboardUserPage);
app.use(sellerPortal);
app.use(productPageRoutes);
app.use(productSearchPage);
app.use(returnsOrderPage);
app.use(wishlistroute);
app.use(login);
app.use(signup);

app.listen(3000);
