const mongoose = require("mongoose");

const User = require("../models/Movie.js");

mongoose.Promise = Promise;
mongoose
  .connect('mongodb://localhost/lab-express-cinema', {useMongoClient: true})
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

  const usersData = [
    {
      firstName : "Paul",
      lastName: "Abarnou",
      pseudo: ["Storm Reid", "Oprah Winfrey", "Reese Witherspoon"],
      email: "https://images-na.ssl-images-amazon.com/images/M/MV5BMjMxNjQ5MTI3MV5BMl5BanBnXkFtZTgwMjQ2MTAyNDM@._V1_UX182_CR0,0,182,268_AL_.jpg",
    },
    {
      firstName : "A Wrinkle in Time",
      lastName: "Ava DuVernay",
      pseudo: ["Storm Reid", "Oprah Winfrey", "Reese Witherspoon"],
      email: "https://images-na.ssl-images-amazon.com/images/M/MV5BMjMxNjQ5MTI3MV5BMl5BanBnXkFtZTgwMjQ2MTAyNDM@._V1_UX182_CR0,0,182,268_AL_.jpg",
    },
    {
      firstName : "A Wrinkle in Time",
      lastName: "Ava DuVernay",
      pseudo: ["Storm Reid", "Oprah Winfrey", "Reese Witherspoon"],
      email: "https://images-na.ssl-images-amazon.com/images/M/MV5BMjMxNjQ5MTI3MV5BMl5BanBnXkFtZTgwMjQ2MTAyNDM@._V1_UX182_CR0,0,182,268_AL_.jpg",
    },
    {
      firstName : "A Wrinkle in Time",
      lastName: "Ava DuVernay",
      pseudo: ["Storm Reid", "Oprah Winfrey", "Reese Witherspoon"],
      email: "https://images-na.ssl-images-amazon.com/images/M/MV5BMjMxNjQ5MTI3MV5BMl5BanBnXkFtZTgwMjQ2MTAyNDM@._V1_UX182_CR0,0,182,268_AL_.jpg",
    },
    {
      firstName : "A Wrinkle in Time",
      lastName: "Ava DuVernay",
      pseudo: ["Storm Reid", "Oprah Winfrey", "Reese Witherspoon"],
      email: "https://images-na.ssl-images-amazon.com/images/M/MV5BMjMxNjQ5MTI3MV5BMl5BanBnXkFtZTgwMjQ2MTAyNDM@._V1_UX182_CR0,0,182,268_AL_.jpg",
    },
    {
      firstName : "A Wrinkle in Time",
      lastName: "Ava DuVernay",
      pseudo: ["Storm Reid", "Oprah Winfrey", "Reese Witherspoon"],
      email: "https://images-na.ssl-images-amazon.com/images/M/MV5BMjMxNjQ5MTI3MV5BMl5BanBnXkFtZTgwMjQ2MTAyNDM@._V1_UX182_CR0,0,182,268_AL_.jpg",
    },
    
  ];


  User.create(usersData)
  .then(usersResults => {
    console.log(`Inserted ${usersResults.length} BOOKS 📖`);
  })
  .catch(err => {
    console.log("Create FAILURE!! 💩", err);