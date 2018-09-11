const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const projectSchema = new Schema({
  // document structure & rules
  name: { type: String, required: true },
  shortDescription: { type: String, required: true },
  longDescription: { type: String, required: true },
  pictureUrl: {type: String},
  moneyExpected: { type: Number, required: true },
  // creationDate: { type: String, required: true },
  endDate: { type: Date, required: true },
  comments: { type: [String]},
  contributors: { type: [String]},
  // owner: {
  //   type: Schema.Types.ObjectId,
  //   ref: "User", 
  //   required: true,
  // },
}, {
  timestamps: true
});

const Project = mongoose.model("Project", projectSchema);


module.exports = Project;