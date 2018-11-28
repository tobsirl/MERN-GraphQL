const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const crypto = require('crypto');

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
    user(id: ID!):User
  }

  type Mutation {
    addUser(email: String!, name: String): User
  }

  type User {
    id: ID!
    email: String!
    name: String
    avatarUrl: String
  }
`);

const rootValue = {
  users: () => db.users,
  user: args => db.users.find(user => user.id === args.id),
  addUser: ({ email, name }) => {
    const user = {
      id: crypto.randomBytes(10).toString('hex'),
      email,
      name
    };

    db.users.push(user);

    return user;
  }
};

const app = express();

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue,
    graphiql: true
  })
);

app.listen(3000, () => console.log(`Listening on port 3000`));
