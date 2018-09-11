const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user-model.js");
const router = express.Router();


router.get("/signup", (req, res, next) => {
  res.render("auth-views/signup.hbs");
});

router.post("/process-signup", (req, res, next) => {
  const { firstName, lastName, email, originalPassword } = req.body;

  // encrypt the submitted password
  const encryptedPassword = bcrypt.hashSync(originalPassword, 10);

  User.create({ firstName, lastName, email, encryptedPassword  })
    .then(userDoc => {
      // save a flash message to display in the HOME page
      // req.flash("success", "Sign up success! 🖖🏾");
      res.redirect("/")
    })
    .catch(err => next(err));
});

module.exports = router;