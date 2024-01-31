// server/apolloServer.js

const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const Post = require("../models/Post");

let server;

async function getServer() {
  if (!server) {
    server = new ApolloServer({
      typeDefs,
      resolvers,
      context: { Post },
    });
    await server.start();
  }
  return server;
}

const app = express();

async function startServer() {
  const apolloServer = await getServer();
  apolloServer.applyMiddleware({ app });
}

module.exports = { app, startServer };
