const express = require('express');
const router  = express.Router();
const Project = require("../models/project-model.js");

/* GET home page */
router.get("/", (req, res, next) => {
  Project.find({}, {}, { sort: { 'created_at' : -1 } }, function(err, post) {})
  .then(projectsArray => {
    // res.send(projectsArray);
    // res.locals.latestProjects = projectsArray;
    res.locals.resultOne = projectsArray[0];
    res.locals.resultTwo = projectsArray[1];
    res.locals.resultThree = projectsArray[2];
    res.render("index.hbs");
  })
  .catch(err => next(err));
  
  

});
//GET projects list page
// router.get("/projects-list", (req, res, next) => {
// res.render("projects-list.hbs");
// });





//GET project page 
router.get("/project-page", (req, res, next) => {
  res.render("project-page.hbs");
});


module.exports = router;


