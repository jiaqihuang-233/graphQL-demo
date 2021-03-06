import { gql } from 'apollo-server-express';

export default gql`
  type Game {
    id: ID!
    title: String!
    price: Float!
    reviews: [Review!]!
    users: [User!]!
  }

  type User {
    id: ID!
    name: String!
    gamesInLibrary: [Game!]!
    friends: [User!]!
  }

  type Review {
    id: ID!
    reviewer: User!
    game: Game!
    """
    An integer between 1 and 5 inclusive
    """
    rating: Int!
  }

  input NewGame {
    title: String
    price: Float
  }

  input NewUser {
    name: String!
  }

  input NewReview {
    gameId: ID!
    userId: ID!
    rating: Int!
  }

  type Query {
    game(id: ID!, title: String): Game
    user(id: ID!): User
    review(userId: ID!, gameId: ID!): Review
  }

  type Mutation {
    addGame(input: NewGame): Game
    addUser(input: NewUser): User
    addReview(input: NewReview): Review
    addFriend(userId: ID!): User
    purchaseGame(gameId: ID!, userId: ID!): Game
  }

  type Subscription {
    friendReviewed: Review
  }
`;
