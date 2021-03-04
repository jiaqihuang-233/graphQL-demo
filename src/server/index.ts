const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const typeDefs = gql`
  type Game {
    id: ID!
    title: String!
    price: Float!
    averageRating: Int
    Users: [User!]!
  }

  type User {
    id: ID!
    name: String!
    gamesInLibrary: [Game!]!
    reviews: [Review!]!
  }

  type Review {
    id: ID!
    user: User!
    game: Game!
    """
    An integer between 1 and 5 inclusive
    """
    rating: Int!
  }

  type Query {
    hello: String
    game(id: ID, title: String!): Game
    user(id: ID!): User
    review(userId: ID!, gameId: ID!): Review
  }
  type Mutation {
    changeGreeting(newGreeting: String): String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello world!'
  },
  Mutation: {
    changeGreeting: (parent, args, context, info) => args.newGreeting
  }
};

(async () => {
  const server = new ApolloServer({ typeDefs, resolvers });

  const app = express();
  server.applyMiddleware({ app });

  app.listen({ port: 8000 }, () =>
    console.log(`🚀 Server ready at http://localhost:8000${server.graphqlPath}`)
  );
})();
