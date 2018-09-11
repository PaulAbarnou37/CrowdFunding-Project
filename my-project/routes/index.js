const express = require('express');
const router  = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index.hbs");
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


