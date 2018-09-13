const express = require("express");
const router = express.Router();
const Project = require("../models/project-model.js");
const User = require("../models/user-model.js");




router.get("/settings", (req, res, next) => {
  if (!req.user) {
    req.flash("error", "You have to be logged to visit User Settings! 😤");

    res.redirect("/login");
  }
  else {
    res.render("settings-page.hbs");
  }
});

router.post("/process-settings", (req, res, next) => {
  const { fullName, email } = req.body;

  User.findByIdAndUpdate(
    req.user._id, // get the logged in user's ID using Passport's "req.user"
    { $set: { fullName, email } },
    { runValidators: true },
  )
    .then(userDoc => {
      // save a flash message to display in the HOME page
      req.flash("success", "Settings saved! 😏");
      res.redirect("/");
    })
    .catch(err => next(err));
});







module.exports = router;