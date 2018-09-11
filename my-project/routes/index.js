const express = require('express');
const router  = express.Router();
const Project = require("../models/project-model.js")

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index.hbs");
});
// // GET projects list page
// router.get("/projects-list", (req, res, next) => {
//   res.render("projects-list.hbs");
// });

// router.get("/projects-list", (req, res, next) => {
//   Project.find()
//   .then(projectResults => {
//     res.locals.projectsArray = projectResults;
//     res.render("projects-list.hbs");
//   })
//   .catch(err => next(err));
// })

//GET project page 
router.get("/project-page", (req, res, next) => {
  res.render("project-page.hbs");
});


module.exports = router;


