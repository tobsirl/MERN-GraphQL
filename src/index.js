import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import connectRedis from 'connect-redis';
import { ApolloServer } from 'apollo-server-express';

import typeDefs from './typeDefs';
import resolvers from './resolvers';

require('dotenv').config();

const app = express();

const {
  PORT,
  NODE_ENV,
  mongoDB,
  SESSION_NAME,
  SESSION_SECRET,
  SESSION_LIFETIME,
  REDIS_HOST,
  REDIS_PORT,
  REDIS_PASSWORD
} = process.env;

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

const RedisStore = connectRedis(session);

const store = new RedisStore({
  host: REDIS_HOST,
  port: REDIS_PORT,
  pass: REDIS_PASSWORD
});

app.use(
  session({
    store,
    name: SESSION_NAME,
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: SESSION_LIFETIME,
      sameSite: true
    }
  })
);

const server = new ApolloServer({
  // These will be defined for both new or existing servers
  typeDefs,
  resolvers,
  playground: NODE_ENV !== 'production',
  context: ({ req, res }) => ({ req, res })
});

server.applyMiddleware({ app }); // app is from an existing express app

app.listen({ port: PORT }, () =>
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  )
);
