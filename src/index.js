import { ApolloServer, gql } from 'apollo-server-express';
import express from 'express';

import typeDefs from './typeDefs';
import resolvers from './resolvers';

const app = express();

app.disable('x-powered-by');

const server = new ApolloServer({
  // These will be defined for both new or existing servers
  typeDefs,
  resolvers
});

server.applyMiddleware({ app }); // app is from an existing express app

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
