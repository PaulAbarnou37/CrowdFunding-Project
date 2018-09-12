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
  res.render("dashboard.hbs")
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


router.get("/projects-list/:projectid", (request,response,next)=>{
  const { projectid } = request.params; // params pour recup ce quil ya dans l'url
  Project.findOne({_id : { $eq: projectid } })
      .then(data => {
        console.log('MY DATAAAAAAAAA');
        console.log(data);
        // ----> 'HERE WHAT WE WANT TO DO AFTER RECEIVING THE DATA FROM THE API'
        response.locals.projectData = data;
        // to show result on browser and not the terminal: 
        // response.send(data.body.artists.items);
        response.render("project-page.hbs");
      })
      .catch(err => {
        // ----> 'HERE WE CAPTURE THE ERROR'
        console.log('There is a Failure', err)
      })
});

router.post("/process-contribution", (req, res, next) => {
  let {amount, projectId} = req.body;
  amount = Number(amount);
  const userId = req.user._id ;
  console.log(amount);
  // USER UPDATE ARRAY WITH INFO
  User.findByIdAndUpdate(
    {_id: userId},
    {$push: {projectsContributed: {amount, projectId}}})
    .then(userDoc => {
      Project.findByIdAndUpdate(
        {_id: projectId},
        {$inc: {moneyReceived: amount}, $push: {contributors: userId}
      })
      .then(userDoc => {
        console.log(projectId)
        res.redirect(`/projects-list/${projectId}`);
      })
    })
    .catch(err => {
      // ----> 'HERE WE CAPTURE THE ERROR'
      console.log('There is a Failure', err)
    });
});
  // res.send(req.body)
  



module.exports = router;