import { gql } from 'apollo-server-express';

export default gql`
  extend type Mutation {
    startChat(title: String, userIds: [ID!]!): Chat @auth
  }

  type Chat {
    id: ID!
    title: String!
    user: [User!]!
    messages: [Message!]!
    lastMessage: Message
    updatedAt: String!
    createdAt: String!
  }
`;
