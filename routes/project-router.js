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
      .populate('owner')
      .then(data => {
        let isPostAuthor
        if (request.user){
          isPostAuthor = data.owner._id.toString() === request.user._id.toString()
        } else {
          isPostAuthor = false
        }
        response.locals.creatorName = data.owner.firstName + " " + data.owner.lastName;
        response.locals.isPostAuthor = isPostAuthor;
        
        // ----> 'HERE WHAT WE WANT TO DO AFTER RECEIVING THE DATA FROM THE API'
        response.locals.projectData = data;
        const contributors = data.contributors.length;
        response.locals.contributors = contributors;
        response.locals.moneyLeft = (data.moneyReceived / data.moneyExpected) * 100 ;
        const countDownDate = new Date(`${data.endDate}`).getTime();
        const newCount = countDownDate/1000/60/60/24;
        const now = new Date().getTime();
        const newNow = now/1000/60/60/24;
        response.locals.timeLeft = Math.floor(newCount - newNow);
        if (data.moneyReceived > data.moneyExpected){
          data.moneyReceived = data.moneyExpected
        };
        
        Comment.find({projectId: {$eq: projectid}})
        .sort({createdAt: -1})
        .populate("commentWriter")
        .then(allcommentsInfo =>{
          response.locals.allComments = allcommentsInfo;
          // response.send(allcommentsInfo)
        response.render("project-page.hbs");
        })
        // to show result on browser and not the terminal: 
        // response.send(data.body.artists.items);
        
      })
      .catch(err => {
        // ----> 'HERE WE CAPTURE THE ERROR'
        console.log('There is a Failure', err)
      })
});

router.post("/process-contribution", (req, res, next) => {
  if(!req.user){
    res.render("auth-views/login.hbs");
  } else {
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
        req.flash("success", "contribution processed successfully!")
        res.redirect(`/projects-list/${projectId}`);
      })
    })
    .catch(err => {
      // ----> 'HERE WE CAPTURE THE ERROR'
      console.log('There is a Failure', err)
    });
}});

router.post("/process-comment", (req, res, next) => {
  const {commentContent, projectId} = req.body;

  let writerFirstName = req.user.firstName;
  let writerLastName = req.user.lastName;

  Comment.create({commentContent, commentWriter:{firstName: writerFirstName, lastName: writerLastName}, projectId})
    .then(myComment => {
      res.locals.commentsInfo = myComment;

      Project.findByIdAndUpdate(
        projectId,
        {$push: {comments: myComment._id}}
      )
      .then( projectDoc => {
        // console.log( projectDoc );
        // res.send(projectDoc);
        // res.locals.comments
        res.redirect(`/projects-list/${projectId}`);
      })
    })
    .catch(err => next(err));
  });



    router.get("/projects-list/:projectid/edit-your-project", (req, res, next) => {
      if (!req.user) {
        req.flash("error", "You have to be logged to visit User Settings! 😤");
    
        res.redirect("/login");
      }
      else {
        const {projectid} = req.params;
        Project.findOne({_id : { $eq: projectid } })
          .then(data => {
            res.locals.projectEdit = data;
        res.render("edit-project.hbs");
      })
    }
    });
    

    router.post("/projects-list/:projectid/process-project", (req, res, next) => {
      const {projectid} = req.params;
      const {projectName, shortDescription, longDescription, pictureUrl, category, endDate, moneyExpected} = req.body;
      Project.findByIdAndUpdate(
        projectid, // get the logged in user's ID using Passport's "req.user"
        { $set: { projectName, shortDescription, longDescription, pictureUrl, category, endDate, moneyExpected } },
        { runValidators: true },
      )
        .then(userDoc => {
          // save a flash message to display in the HOME page
          req.flash("success", "Your project has been edited successfully");
          res.redirect(`/projects-list/${projectid}`);
        })
        .catch(err => next(err));
    });




module.exports = router;