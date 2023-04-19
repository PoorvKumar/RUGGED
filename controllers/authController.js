const user = require("../models/user");
const bcrypt = require("bcryptjs");
exports.getLogin = (req, res, next) => {
  res.render("login", {
    pageTitle: "Login-page",
  });
};
exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  user
    .findOne({ email: email })
    .then((usercollection) => {
      if (!usercollection) {
        //Email not exists
        res.redirect("/login");
      }
      return bcrypt
        .compare(password, usercollection.password)
        .then((check) => {
          if (check) {
            req.session.isLoggedin = true;
            req.session.user = usercollection;
            return req.session.save((err) => {
              console.log(err);
              res.redirect("/");
            });
          }
          //password donot match
          res.redirect("/login");
        })
        .catch((err) => {
          //error while comparing password
          console.log(err);
          res.redirect("/login");
        });
    })
    .catch((err) => {
      //error while find operation
      console.log(err);
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};

exports.getSignup = (req, res, next) => {
  res.render("signup", {
    pageTitle: "Signup-Page",
  });
};

exports.postSignup = (req, res, next) => {
  firstname = req.body.First;
  lastname = req.body.Last;
  phone = req.body.Phone;
  email = req.body.email;
  password = req.body.password;
  user
    .findOne({ email: email })
    .then((usercollection) => {
      if (usercollection) {
        //Email already exists
        return res.redirect("/signup");
      }
      return bcrypt
        .hash(password, 13)
        .then((pass) => {
          const person = new user({
            firstname: firstname,
            lastname: lastname,
            phoneno: phone,
            email: email,
            password: pass,
          });
          return person.save();
        })
        .then((result) => {
          //Successful registration
          res.redirect("/login");
        });
    })
    .catch((err) => {
      console.log(err);
    });
};
