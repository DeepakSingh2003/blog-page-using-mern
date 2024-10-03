const mongoose = require("mongoose");
const { type } = require("os");
const blogSchema = mongoose.Schema({
  blogtitle: {
    type: String,
  },
  blogcontent: {
    type: String,
  },
});
const blogs = mongoose.model("blogs", blogSchema);
module.exports = blogs;
