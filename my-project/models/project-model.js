const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const projectSchema = new Schema({
  // document structure & rules
  projectName: { type: String, required: true },
  shortDescription: { type: String, required: true, maxlength : 20 },
  longDescription: { type: String, required: true },
  pictureUrl: {type: String, required: true},
  moneyExpected: { type: Number, required: true },
  moneyReceived: { type: Number, default: 0, },
  endDate: { type: Date, required: true },
  comments: { type: [String]},
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
});

const Project = mongoose.model("Project", projectSchema);


module.exports = Project;