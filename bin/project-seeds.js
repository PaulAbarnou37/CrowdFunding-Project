const mongoose = require("mongoose");

const Project = require("../models/project-model.js");

mongoose.Promise = Promise;
mongoose
  .connect('mongodb://localhost/crowdfunding-project', {useMongoClient: true})
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

  const projectData = [
    {

      projectName: { type: String, required: true },
      shortDescription: { type: String, required: true, maxlength : 20 },
      longDescription: { type: String, required: true },
      pictureUrl: {type: String, required: true},
      moneyExpected: { type: Number, required: true },
      moneyReceived: { type: Number, default: 0, },
      endDate: { type: Date, required: true },
      comments: { type: [String]},
      category: { type: [String]},
      contributors: [
        {
          type: Schema.Types.ObjectId,
          ref: "User", 
          required: true,
        }
      ],
      owner: {
        type: Schema.Types.ObjectId,
        ref: "User", 
        required: true,
      },
    }, {
      timestamps: true












      name: "The Chicken Killer",
      shortDescription: "This app is supposed to kill chicken",
      longDescription: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
      moneyExpected: 10000,
      endDate: 12/03/2018,
      contributors: ["5b9681e995e9bc0db5d86e5b", ],
      // owner: {
      //   type: Schema.Types.ObjectId,
      //   ref: "User", 
      //   required: true,
      // }
    },
    {
      name: "The Chicken Killer",
      shortDescription: "This app is supposed to kill chicken",
      longDescription: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
      moneyExpected: 10000,
      endDate: 12/03/2018,
      contributors: ["5b9681e995e9bc0db5d86e5b", ],
      // owner: {
      //   type: Schema.Types.ObjectId,
      //   ref: "User", 
      //   required: true,
      // }
    },
    {
      name: "The Chicken Killer",
      shortDescription: "This app is supposed to kill chicken",
      longDescription: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
      moneyExpected: 10000,
      endDate: 12/03/2018,
      contributors: ["5b9681e995e9bc0db5d86e5b", ],
      // owner: {
      //   type: Schema.Types.ObjectId,
      //   ref: "User", 
      //   required: true,
      // }
    },
    {
      name: "The Chicken Killer",
      shortDescription: "This app is supposed to kill chicken",
      longDescription: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
      moneyExpected: 10000,
      endDate: 12/03/2018,
      contributors: ["5b9681e995e9bc0db5d86e5b", ],
      // owner: {
      //   type: Schema.Types.ObjectId,
      //   ref: "User", 
      //   required: true,
      // }
    },
      
  ];


  Project.create(projectData)
  .then(projectsResults => {
    console.log(`Inserted ${projectsResults.length} Projects 📖`);
  })
  .catch(err => {
    console.log("Create FAILURE!! 💩", err);
  });