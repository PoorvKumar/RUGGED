const express = require("express");
const app = express();
const path = require("path");
const ejs = require("ejs");

const bodyparser = require("body-parser"); //body-parser
const session = require("express-session"); //express-session

const sqlite3 = require("sqlite3").verbose(); //sqlite3

// const dbh=new sqlite3.Database('./database/project.db');

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
// app.use(bodyparser.json)
app.use(bodyparser.urlencoded({ extended: true }));

//routing
const sellerdashboardRoutes = require("./routes/sellerDashboardRoutes");
const influencerBlogRoutes = require("./routes/blogPost");
const wishlistroute = require("./routes/wishlist");
const productPageRoutes = require("./routes/productPage");
const productSearchPage = require("./routes/productSearchpage");
const returnsOrderPage = require("./routes/returnsAndorder");
const dashboardUserPage = require("./routes/dashboardUser");
const sellerPortal = require("./routes/sellerPortal");
const index = require("./routes/index.js");
const login = require("./routes/login");
const signup = require("./routes/signup");
const logout = require("./routes/logout");
const aboutus=require("./routes/aboutUsRoutes")
const contactus=require('./routes/contactUs')
const productcardcaro=require('./routes/productSearchPageCaro')
// app.use('/index', (req, res, next) => {
//   res.render('index.ejs');
// })
//==============================================================
let db = new sqlite3.Database("./database/project.db", (err) => {
  //Initialise Connection with in-memory DB
  if (err) {
    // Cannot open database
    console.error(err.message);
    throw err;
  } else {
    console.log("Connected to the SQLite database.");
  }
});

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);
// app.post('/login',(req,res)=>{
//     let user = [];
//         var email=req.body.email;
//         // email.toLowerCase();
//         var sql = "SELECT * FROM Customer WHERE email = ?";
//         db.all(sql, email, function(err, rows) {
//             if (err){
//                 res.status(400).json({"error": err.message})
//                 return;
//             }

//             rows.forEach(function (row) {
//                 user.push(row);
//             })
//     if(req.body.email==user[0].email && req.body.password==user[0].password){
//         // req.session.user=currentUser;
//         req.session.user=user[0]
//         res.redirect('/')
//     }
//     else{
//         res.end("Invalid Username or Password");

//     }
// });
// });

//login implementation
app.post("/login", (req, res, next) => {
  let sql = `SELECT * FROM customer WHERE email = "${req.body.email}" AND password = "${req.body.password}"`;
  var x;

  db.all(sql, (err, rows) => {
    if (err) {
      next(err);
      return;
    }
    if (!rows) {
      res.status(400);
      res.send("Invalid username or password");
      return;
    }
    rows.forEach((row) => {
      if (row.email === req.body.email && row.password === req.body.password) {
        req.session.user = row;
        x = 1;
      } else {
        x = 2;
        db.close();
      }
    });
    if (x === 1) {
      res.redirect("/");
    } else {
      res.render("login.ejs", {
        data: "Invalid login credentials.",
        title: "Login Portal",
      });
    }
  });
});

//signup implementation
app.post("/signup", (req, res) => {
  firstname = req.body.First;
  lastname = req.body.Last;
  phone = req.body.Phone;
  email = req.body.email;
  password = req.body.password;
  var previd = `select max(id) as id from customer;`;
  var id = 0;
  var user = [];
  db.get(previd, (err, rows) => {
    if (err) {
      res.status(400).send("eror");
      return;
    }

    id = rows.id + 1;
    var insert = `insert into customer (id,firstname,lastname,phone,email,password) values(?,?,?,?,?,?);`;
    db.run(insert, [id, firstname, lastname, phone, email, password], (err) => {
      if (err) {
        console.error(err.message);
        res.status(400).send("Error signing up.");
      } else {
        res.redirect("/login");
      }
    });
  });
});

//update user info dashboard
app.post("/dashboardUser", (req, res) => {
  var val = req.body;
  var cust = req.session.user.id;
  var update = `update customer set firstname=?,lastname=?,phone=?,email=?,addressline1=?,addressline2=?,state=?,country=? where id=?`;
  db.run(
    update,
    [
      req.body.First,
      req.body.Last,
      req.body.Phone,
      req.body.email,
      req.body.Address,
      req.body.AddressAlt,
      req.body.state,
      req.body.country,
      cust,
    ],
    (err) => {
      if (err) {
        console.error(err.message);
        res.status(400).send("Error while updating");
      } else {
        res.redirect("/dashboardUser");
      }
    }
  );
});

//delete user implementation
app.get('/delete', function(req, res, next) {
  var userID=req.session.user.id
var del=`delete from customer where id=?`
db.run(del,[userID],(err)=>{
  if(err){
    console.error(err.message);
    res.status(400).send("Error while deleting");
  }else{
req.session.destroy()
 const val={
  firstname: 'User'
 }
 res.render('index',{data:val})
}})})

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
app.use(logout);
app.use(aboutus)
app.use(contactus)
app.use(productcardcaro)

app.listen(3000);
