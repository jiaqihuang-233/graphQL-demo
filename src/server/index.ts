import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import { createConnection } from './util/connection';
import typeDefs from './typeDefs';
import { getManager } from 'typeorm';

const main = async () => {
  await createConnection();

  const resolvers = {
    Query,
    Mutation,
    // Subscription
  };

  const server = new ApolloServer({
    typeDefs,
    resolvers
  });

  const app = express();
  server.applyMiddleware({ app });

  app.listen({ port: 8000 }, () =>
    console.log(`🚀 Server ready at http://localhost:8000${server.graphqlPath}`)
  );
};

main();
