import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    me: User @auth
    user(id: ID!): User
    users: [User!]!
  }
  extend type Mutation {
    signUp(
      email: String!
      username: String!
      name: String!
      password: String!
    ): User @guest
    signIn(email: String!, password: String!): User
    signOut: Boolean
  }
  type User {
    id: ID!
    email: String!
    username: String!
    name: String!
    createdAt: String!
  }
`;
