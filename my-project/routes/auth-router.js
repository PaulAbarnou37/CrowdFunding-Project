const express = require("express");
const router = express.Router();
// const passport = require("passport");

const User = require("../models/user-model.js");

const bcrypt = require("bcrypt");

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
    res.redirect("/")
  })
  .catch(err => next(err));
});

//GET login page
router.get("/login", (req, res, next) => {
  res.render("auth-views/login.hbs");
});

module.exports = router;
