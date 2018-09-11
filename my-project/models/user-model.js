const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const userSchema = new Schema({
  // document structure & rules
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  pseudo: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^.+@.+\..+$/,
  },
  encryptedPassword: { type: String },
  moneyDonated: { type: [Number]},
  projectContributed: { type: [String]},
}, {
  // additional settings for Schema constructor function (class)
  timestamps: true,
});

// define the "isAdmin" virtual property (a property that's really a method)
// CAN'T be an arrow function because it uses "this"
// (we use this to get around the limits on conditions in HBS files)


const User = mongoose.model("User", userSchema);


module.exports = User;


