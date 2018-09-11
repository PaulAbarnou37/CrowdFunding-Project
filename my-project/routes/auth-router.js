const express = require("express");
const router = express.Router();
const passport = require("passport");

const bcrypt = require("bcrypt");

const User = require("../models/user-model.js");



//GET start a project page
router.get("/start-a-project", (req, res, next) => {
  res.render("start-a-project.hbs");
});


//GET signup page
router.get("/signup", (req, res, next) => {
  res.render("auth-views/signup.hbs")
});

//REGISTER SIGNUP DETAILS IN DATABASE
router.post("/process-signup", (req, res, next) => {
  const {firstName, lastName, email, originalPassword} = req.body;

  const encryptedPassword = bcrypt.hashSync(originalPassword, 10);

  User.create({firstName, lastName, email, encryptedPassword})
  .then(UserDoc => {
    req.flash("success", "Sign up success!");
    res.redirect("/")
  })
  .catch(err => next(err));
});

//GET login page
router.get("/login", (req, res, next) => {
  res.render("auth-views/login.hbs");
});
router.post("/process-login", (req, res, next) => {
  const {email, originalPassword} = req.body;

User.findOne({email: {$eq:email}})
.then(userDoc => {
  if (!userDoc) {
    req.flash("error", "incorrect email");
    res.redirect("/login");
    return;
  }
  const {encryptedPassword} = userDoc;
  if(!bcrypt.compareSync(originalPassword, encryptedPassword)){
    req.flash("error", "password is wrong");
    res.redirect("/login");
    return;
  }
  req.logIn(userDoc, () => {
    req.flash("success", "Log in success!");
    res.redirect("/");
  });
})
  .catch(err => next(err));
});



module.exports = router;
