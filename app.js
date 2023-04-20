const express = require("express");
const app = express();
const path = require("path");
const ejs = require("ejs");
const bodyparser = require("body-parser"); //body-parser
const session = require("express-session"); //express-session
const mongoose = require("mongoose");
const mongodbsessionStore=require('connect-mongodb-session')(session)
// const user = require("./models/user");
const sessionStore=new mongodbsessionStore({
  uri:"mongodb+srv://divyankkhajuria:12345@rugged-cluster.fdpaj0y.mongodb.net/RUGGED?retryWrites=true&w=majority",
  collection:'session',
})
const User = require("./models/user");
// const dbh=new sqlite3.Database('./database/project.db');

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
// app.use(bodyparser.json)
app.use(bodyparser.urlencoded({ extended: true }));

//routing
// const sellerdashboardRoutes = require("./routes/sellerDashboardRoutes");
// const influencerBlogRoutes = require("./routes/blogPost");
// const productPageRoutes = require("./routes/productPage");
// const productSearchPage = require("./routes/productSearchpage");
// const returnsOrderPage = require("./routes/returnsAndorder");
// const dashboardUserPage = require("./routes/dashboardUser");
// const sellerPortal = require("./routes/sellerPortal");
// const aboutus = require("./routes/aboutUsRoutes");
// const contactus = require("./routes/contactUs");
// const productcardcaro = require("./routes/productSearchPageCaro");
const filteringRoute = require("./routes/filterRoute");
// app.use('/index', (req, res, next) => {
//   res.render('index.ejs');
// })
//==============================================================
// let db = new sqlite3.Database("./database/project.db", (err) => {
//   //Initialise Connection with in-memory DB
//   if (err) {
//     // Cannot open database
//     console.error(err.message);
//     throw err;
//   } else {
//     console.log("Connected to the SQLite database.");
//   }
// });

// new Routes
const sellerRoutes = require("./routes/sellerRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes=require('./routes/authRoute');
const indexRoutes=require('./routes/indexRoutes');
const searchRoute=require("./routes/searchRoute");
const productRoutes=require("./routes/productRoutes");

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store:sessionStore
  })
);

// //login implementation
// app.post("/login", (req, res, next) => {
//   let sql = `SELECT * FROM customer WHERE email = "${req.body.email}" AND password = "${req.body.password}"`;
//   var x;

//   db.all(sql, (err, rows) => {
//     if (err) {
//       next(err);
//       return;
//     }
//     if (!rows) {
//       res.status(400);
//       res.send("Invalid username or password");
//       return;
//     }
//     rows.forEach((row) => {
//       if (row.email === req.body.email && row.password === req.body.password) {
//         req.session.user = row;
//         x = 1;
//       } else {
//         x = 2;
//         db.close();
//       }
//     });
//     if (x === 1) {
//       res.redirect("/");
//     } else {
//       res.render("login.ejs", {
//         data: "Invalid login credentials.",
//         title: "Login Portal",
//       });
//     }
//   });
// });

// //signup implementation
// app.post("/signup", (req, res) => {
//   firstname = req.body.First;
//   lastname = req.body.Last;
//   phone = req.body.Phone;
//   email = req.body.email;
//   password = req.body.password;
//   var previd = `select max(id) as id from customer;`;
//   var id = 0;
//   var user = [];
//   db.get(previd, (err, rows) => {
//     if (err) {
//       res.status(400).send("eror");
//       return;
//     }

//     id = rows.id + 1;
//     var insert = `insert into customer (id,firstname,lastname,phone,email,password) values(?,?,?,?,?,?);`;
//     db.run(insert, [id, firstname, lastname, phone, email, password], (err) => {
//       if (err) {
//         console.error(err.message);
//         res.status(400).send("Error signing up.");
//       } else {
//         res.redirect("/login");
//       }
//     });
//   });
// });

// //update user info dashboard
// app.post("/dashboardUser", (req, res) => {
//   var val = req.body;
//   var user = req.session.user;
//   if (!user) {
//     res.redirect("/login");
//   } else {
//     var cust = req.session.user.id;
//     var update = `update customer set firstname=?,lastname=?,phone=?,email=?,addressline1=?,addressline2=?,state=?,country=? where id=?`;
//     db.run(
//       update,
//       [
//         req.body.First,
//         req.body.Last,
//         req.body.Phone,
//         req.body.email,
//         req.body.Address,
//         req.body.AddressAlt,
//         req.body.state,
//         req.body.country,
//         cust,
//       ],
//       (err) => {
//         if (err) {
//           console.error(err.message);
//           res.status(400).send("Error while updating");
//         } else {
//           res.redirect("/dashboardUser");
//         }
//       }
//     );
//   }
// });

// //delete user implementation
// app.get("/delete", function (req, res, next) {
//   var user = req.session.user;
//   if (!user) {
//     res.redirect("/login");
//   } else {
//     var userID = req.session.user.id;
//     var del = `delete from customer where id=?`;
//     db.run(del, [userID], (err) => {
//       if (err) {
//         console.error(err.message);
//         res.status(400).send("Error while deleting");
//       } else {
//         req.session.destroy();
//         const val = {
//           firstname: "User",
//         };
//         res.render("index", { data: val });
//       }
//     });
//   }
// });
//-----------------------
app.use((req, res, next) => {
  if (!req.session.user) return next();

  const user = req.session.user;
  User
    .findById(user._id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(error => console.log(error));
});
//-----------------------
//using routes
// app.use(index);
// app.use(influencerBlogRoutes);
// app.use(sellerdashboardRoutes);
// app.use(dashboardUserPage);
// app.use(sellerPortal);
// app.use(productPageRoutes);
// app.use(productSearchPage);
// app.use(returnsOrderPage);
// app.use(wishlistroute);
// app.use(login);
// app.use(signup);
// app.use(logout);
// app.use(aboutus);
// app.use(contactus);
// app.use(productcardcaro);

// -----NewRoutes-------------
app.use(sellerRoutes);
app.use(userRoutes);
app.use(authRoutes);
app.use(indexRoutes)
app.use(productRoutes);

//Search Route
app.use(searchRoute);


// Filters Route
app.use(filteringRoute);


//----------------------------
mongoose
  .connect(
    "mongodb+srv://divyankkhajuria:12345@rugged-cluster.fdpaj0y.mongodb.net/RUGGED?retryWrites=true&w=majority"
  )
  .then((result) => {
    console.log("Server started...");
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
