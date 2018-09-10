const express = require("express");

const router = express.Router();

const Project = require("../models/project-model.js");


//GET projects list page
router.get("/projects-list", (req, res, next) => {

Project.find()
  .sort({ createdAt: -1})//use ".sort()" to order results (-1 for reverse")
  .then(projectResults => {
    res.locals.projectArray = projectResults;
    res.render("projects-list.hbs");
  })
    .catch(err => next(err));
});

module.exports = router;
