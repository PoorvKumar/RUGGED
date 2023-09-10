const express = require("express");
const app = express();
const path = require("path");
const ejs = require("ejs");
const bodyparser = require("body-parser"); //body-parser
const session = require("express-session"); //express-session
const mongoose = require("mongoose");
const mongodbsessionStore = require("connect-mongodb-session")(session);
// const user = require("./models/user");
const sessionStore = new mongodbsessionStore({
  uri: "mongodb+srv://divyankkhajuria:12345@rugged-cluster.fdpaj0y.mongodb.net/RUGGED?retryWrites=true&w=majority",
  collection: "session",
});
const User = require("./models/user");
const Order= require("./models/orders")
// const dbh=new sqlite3.Database('./database/project.db');

const dotenv=require('dotenv');
dotenv.config();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

// NEW___ROUTES
const sellerRoutes = require("./routes/sellerRoutes");
const userRoutes = require("./routes/userRoutes");
const influencerRoutes = require("./routes/influencerRoutes");
const authRoutes = require("./routes/authRoute");
const indexRoutes = require("./routes/indexRoutes");
const searchRoute = require("./routes/searchRoute");
const productRoutes = require("./routes/productRoutes");
const adminRoutes = require("./routes/adminRoutes");
const filteringRoute = require("./routes/filterRoute");

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
  })
);

app.use((req, res, next) => {
  if (!req.session.user) return next();

  const user = req.session.user;
  User.findById(user._id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((error) => console.log(error));
});
// -----NewRoutes-------------
app.use(adminRoutes);
app.use(sellerRoutes);
app.use(userRoutes);
app.use(influencerRoutes);
app.use(authRoutes);
app.use(indexRoutes);
app.use(productRoutes);

//Search Route
app.use(searchRoute);

// Filters Route
app.use(filteringRoute);

const PORT=process.env.PORT || 3000;

//----------------------------
mongoose
  .connect("mongodb+srv://divyankkhajuria:12345@rugged-cluster.fdpaj0y.mongodb.net/RUGGED?retryWrites=true&w=majority")
  .then((result) => {
    console.log("Server started...");
    app.listen(PORT);
  })
  .catch((err) => {
    console.log(err);
  });
