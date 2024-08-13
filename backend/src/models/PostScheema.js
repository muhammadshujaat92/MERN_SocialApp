const mongoose = require("mongoose");

const PostsSchema = new mongoose.Schema({
    userId: String,
    userImage: String,
    firstName: String,
    lastName: String,
    location: String,
    description: String,
    image: String,
    userPicturePath: String,
    likes: {
      type: Map,
      of: Boolean,
    },
    comments: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }

);

const Post = mongoose.model("post", PostsSchema);

module.exports = Post;