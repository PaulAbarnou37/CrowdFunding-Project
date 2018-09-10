const express = require("express");

const router = express.Router();

const Project = require("../models/project-model.js");

router.get("/my-projects", (req, res, next) => {
  if (!req.user) {
    req.flash("error", "You must be logged in to see your projects.");
    res.redirect("/login");
    return; //use "return" instead of really big "else {}"
  }
    //find projects created by the logged in user 
Project.find({ user: {$eq: req.user._id}})
.sort({ createdAt: -1})//use ".sort()" to order results (-1 for reverse")
.then(projectResults => {
  res.locals.projectArray = projectResults;
  res.render("views/my-projects-list.hbs");
})
  .catch(err => next(err));
});

router.get("/start-a-project", (req, res, next) => {
  if(!req.user){
    req.flash("error", "You must be logged in to start a project.");
    res.redirect("/login");
  } 
  else {
    res.render("views/start-a-project.hbs");
  }
});


router.post("/process-project", (req, res, next) => {
  const {name, description, pictureUrl,longDescription, shortDescription, fundingTarget, createdAt, endDate} = req.body;
  const user = req.user._id;

  Project.create({ name, description, pictureUrl, longDescription, shortDescription, fundingTarget, createdAt, endDate, user})
  .then(projectDoc => {
    req.flash("success", "project created successfully!");
    res.redirect("/my-projects"); 
  })
  .catch(err => next(err));
});

module.exports = router;
