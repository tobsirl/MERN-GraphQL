const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const db = {
  users: [
    {
      id: '1',
      email: 'alex@gmail.com',
      name: 'Alex',
      avatarUrl: 'https://gravatar.com/...'
    },
    {
      id: '2',
      email: 'bill@gmail.com',
      name: 'Bill',
      avatarUrl: 'https://gravatar.com/...'
    },
    {
      id: '3',
      email: 'jane@gmail.com',
      name: 'Jane',
      avatarUrl: 'https://gravatar.com/...'
    }
  ]
};

const schema = buildSchema(`
  type Query {
    users: [User!]!
  }

  type User {
    id: ID!
    email: String!
    name: String
    avatarUrl: String
  }
`);

const rootValue = {
  users: () => db.users
}

const app = express();

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
);

app.listen(3000, () => console.log(`Listening on port 3000`));
