const express = require('express');
const router  = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index.hbs");
});
//GET projects list page
router.get("/projects-list", (req, res, next) => {
res.render("projects-list.hbs");
});
//GET project page 
router.get("/project-page", (req, res, next) => {
  res.render("project-page.hbs");
});
//GET start a project page
router.get("/start-a-project", (req, res, next) => {
  res.render("start-a-project.hbs");
});
//GET signup page
router.get("/signup", (req, res, next) => {
  res.render("auth-views/signup.hbs")
})
//GET login page
router.get("/login", (req, res, next) => {
  res.render("auth-views/login.hbs");
});

module.exports = router;


