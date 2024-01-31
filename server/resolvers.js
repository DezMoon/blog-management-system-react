// server/resolvers.js

const Post = require("../models/Post");

const resolvers = {
  Query: {
    posts: async () => {
      return await Post.find();
    },
  },
};

module.exports = resolvers;
