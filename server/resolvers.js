// server/resolvers.js

const Post = require("../models/Post");

const resolvers = {
  Query: {
    posts: async () => {
      return await Post.find();
    },
  },
  Mutation: {
    addPost: async (_, { title, content }, { Post }) => {
      const newPost = new Post({ title, content });
      await newPost.save();
      return newPost;
    },
  },
};

module.exports = resolvers;
