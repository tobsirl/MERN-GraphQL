import { gql } from 'apollo-server-express';

export default gql`
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
