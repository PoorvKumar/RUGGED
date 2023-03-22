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
const prodSearchCaro=require('./routes/productSearchPageCaro');

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
app.use(prodSearchCaro);


app.listen(3000);