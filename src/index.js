import { ApolloServer, gql } from 'apollo-server-express';
import express from 'express';

import typeDefs from './typeDefs';
import resolvers from './resolvers';

require('dotenv').config();

const app = express();

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