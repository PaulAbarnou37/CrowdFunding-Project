const express = require("express");

const router = express.Router();

const Project = require("../models/project-model.js");

const Comment = require("../models/comments-model.js");

const User = require("../models/user-model.js");





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
});

router.get("/projects-list/:projectid", (request,response,next)=>{
  const { projectid } = request.params; // params pour recup ce quil ya dans l'url
  Project.findOne({_id : { $eq: projectid } })
      .then(data => {
        console.log('MY DATAAAAAAAAA');
        console.log(data);
        // ----> 'HERE WHAT WE WANT TO DO AFTER RECEIVING THE DATA FROM THE API'
        response.locals.projectData = data;
        response.locals.moneyLeft = (data.moneyReceived / data.moneyExpected) * 100 ;
        var countDownDate = new Date(`${data.endDate}`).getTime();
        var newCount = countDownDate/1000/60/60/24;
        var now = new Date().getTime();
        var newNow = now/1000/60/60/24;
        response.locals.timeLeft = Math.floor(newCount - newNow);
        if (data.moneyReceived > data.moneyExpected){
          data.moneyReceived = data.moneyExpected

        };

        // to show result on browser and not the terminal: 
        // response.send(data.body.artists.items);
        response.render("project-page.hbs");
      })
      .catch(err => {
        // ----> 'HERE WE CAPTURE THE ERROR'
        console.log('There is a Failure', err)
      })
});

router.post("/process-contribution", (req, res, next) => {
  // res.send(req.body);
  let {amount, projectId} = req.body;
  amount = Number(amount);
  const userId = req.user._id ;
  // USER UPDATE ARRAY WITH INFO
  User.findByIdAndUpdate(
    {_id: userId},
    {$push: {projectsContributed: {amount, project: projectId}}})
    .then(userDoc => {
      Project.findByIdAndUpdate(
        {_id: projectId},
        {$inc: {moneyReceived: amount}, $push: {contributors: userId}
      })
      .then(userDoc => {
        console.log(projectId)
        req.flash("success", "contribution processed successfully!")
        res.redirect(`/projects-list/${projectId}`);
      })
    })
    .catch(err => {
      // ----> 'HERE WE CAPTURE THE ERROR'
      console.log('There is a Failure', err)
    });
});

router.post("/process-comment", (req, res, next) => {
  const {commentContent, projectId} = req.body;
  let commentWriter = req.user._id;

  // let commentProject = req.project._id;
  Comment.create({commentContent, commentWriter, projectId})
    .then(myComment => {

      Project.findByIdAndUpdate(
        projectId,
        {$push: {comments: myComment._id}}
      )
      .then( projectDoc => {
      






        console.log( projectDoc );
        res.send(projectDoc);
        res.locals.comments
        res.redirect(`/projects-list/${projectId}`);
      })
    })
    .catch(err => next(err));
    });


module.exports = router;