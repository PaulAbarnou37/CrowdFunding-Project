const express = require("express");

const router = express.Router();

const Project = require("../models/project-model.js");

router.get("/projects-list", (req, res, next) => {
  Project.find()
  .then(projectResults => {
    res.locals.projectsArray = projectResults;
    res.render("projects-list.hbs");
  })
  .catch(err => next(err));
})

module.exports = router;