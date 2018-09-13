const express = require("express");
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcrypt");
const User = require("../models/user-model.js");
const Project = require("../models/project-model.js");


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
    
    req.logIn(UserDoc, () => {
      req.flash("success", "Signup success!");
      res.redirect("/dashboard");
    });
  })
  .catch(err => next(err));
});

router.get("/dashboard", (req, res, next) => {
  res.locals.userInfo = req.user;
  Project.find({owner : { $eq: req.user._id } })
  .then(projectsArray => {
    res.locals.userProjects = projectsArray;
    User.find({_id: { $eq: req.user._id }})
    // .populate(path: projectsContributed.project)
    
    .populate("projectsContributed.project")
    .then(usersArray => {
      res.locals.userMe = usersArray[0].firstName;
      // res.send(usersArray);
    // console.log(usersArray);
    res.locals.userContributions = usersArray[0].projectsContributed;
    
    
    

    res.render("dashboard.hbs")
  })
  })
  .catch(err => next(err));

// User.find({projectsContributed: {$eq: req.user._id} })
//   .then(projectsContributedArray => {
//     res.locals.userContributions = projectsContributedArray;
//     res.render("dashboard.hbs")
//   })
//   .catch(err => next(err))
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
    res.redirect("/dashboard");
  });
})
  .catch(err => next(err));
});

router.get("/logout", (req, res, next) => {
  // "req.logOut()" is a Passport method that removes the user ID from session
  req.logOut();

  // save a flash message to display in the HOME page
  req.flash("success", "Logged out successfully!");
  res.redirect("/");
});





  
  



module.exports = router;