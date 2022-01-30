const mongoose = require("mongoose"); 


  const blogPostSchema = new mongoose.Schema({

  title:{type:String,required:true},description:{type:String,required:true},createdOn: {
    type: Date,
    required: true,
    default: Date.now(),
  },

  }); 


  module.exports = mongoose.models.blogPost || mongoose.model("blogPost", blogPostSchema);