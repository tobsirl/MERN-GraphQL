import express from 'express';
import mongoose from 'mongoose';
import { ApolloServer } from 'apollo-server-express';

import typeDefs from './typeDefs';
import resolvers from './resolvers';

require('dotenv').config();

const app = express();

const { PORT, NODE_ENV, mongoDB } = process.env;

mongoose
  .connect(
    mongoDB,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log(`Connected to MongoDB`);
  })
  .catch(() => err => {
    console.log(err);
  });

app.disable('x-powered-by');

const server = new ApolloServer({
  // These will be defined for both new or existing servers
  typeDefs,
  resolvers,
  playground: NODE_ENV !== 'production'
});

server.applyMiddleware({ app }); // app is from an existing express app

app.listen({ port: PORT }, () =>
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  )
);
