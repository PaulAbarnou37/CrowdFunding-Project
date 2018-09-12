const express = require("express");

const router = express.Router();

const Project = require("../models/project-model.js");



//GET start a project page
router.get("/start-a-project", (req, res, next) => {
  if(req.user) {
  res.render("start-a-project.hbs");
  } else{
    res.redirect("/login");
  }
});

router.post("/project-creation", (req, res, next) => {
  const {projectName, shortDescription, longDescription, pictureUrl, category, endDate, moneyExpected} = req.body;
let owner = req.user._id;
  Project.create({projectName, shortDescription, longDescription, pictureUrl, category, endDate, moneyExpected, owner})
  .then(UserDoc => {
    // const {projectId} = req.body._id;
    // req.flash("success", "Sign up success!");
    res.redirect(`/projects-list/`)
  })
  .catch(err => next(err));
});




router.get("/projects-list", (req, res, next) => {
  Project.find()
  .then(projectResults => {
    res.locals.projectsArray = projectResults;
    res.render("projects-list.hbs");
  })
  .catch(err => next(err));
})

module.exports = router;