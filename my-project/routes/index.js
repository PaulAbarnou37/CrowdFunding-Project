const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
    //req.user comes from Passport's deserializeUser().
  //it's the document of the currently logged in user
  res.render('index');

if (req.user) {
  console.log("LOGGED IN!");
} 
else {
  console.log ("LOGGED OUT");
}

res.render("index.hbs");
});
module.exports = router;

