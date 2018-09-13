const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const moment = require("moment");


const commentSchema = new Schema({
  
  commentContent: { type: String, required: true },
  commentWriter: {
    type: Schema.Types.ObjectId,
    ref: "User", 
    required: true,
  },
  projectId: {
      type: Schema.Types.ObjectId,
      ref: "Project", 
      required: true,
    }
  },
  {
    // additional settings for Schema constructor function (class)
    timestamps: true,
  }
  );

  const Comment = mongoose.model("Comment", commentSchema);


  module.exports = Comment;
