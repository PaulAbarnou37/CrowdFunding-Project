const mongoose = require("mongoose");

const User = require("../models/user-model.js");

mongoose.Promise = Promise;
mongoose
  .connect('mongodb://localhost/crowdfunding-project', {useMongoClient: true})
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

  const usersData = [
    {
      firstName : "Paul",
      lastName: "Abarnou",
      pseudo: "Le Tourangeaux",
      email: "paulabarnou@letourangeau.com",
    },
    {
      firstName : "John",
      lastName: "Dimitroff",
      pseudo: "The British",
      email: "johndimitroff@thebritish.com",
    },
    {
      firstName : "Manu",
      lastName: "Jaldorau",
      pseudo: "La Réunionnaise",
      email: "manujaldorau@lareunionnaise.com",
    },
    {
      firstName : "Mohammed",
      lastName: "Zamama",
      pseudo: "The Marrakchi",
      email: "momozamama@themarrakchi.com",
    },  
  ];


  User.create(usersData)
  .then(usersResults => {
    console.log(`Inserted ${usersResults.length} BOOKS 📖`);
  })
  .catch(err => {
    console.log("Create FAILURE!! 💩", err);
  });