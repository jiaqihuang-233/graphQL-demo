import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { createConnection } from './util/connection';
import { buildSchema } from 'type-graphql';
import { GameResolver } from './resolvers/gameResolvers';
import { UserResolver } from './resolvers/userResolvers';
import { ReviewResolver } from './resolvers/reviewResolvers';
import http from 'http';

const PORT = 8000;

const main = async () => {
  await createConnection();

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [GameResolver, UserResolver, ReviewResolver]
    })
  });

  const app = express();
  server.applyMiddleware({ app });

  const httpServer = http.createServer(app);
  server.installSubscriptionHandlers(httpServer);

  httpServer.listen(PORT, () => {
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
    );
    console.log(
      `🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`
    );
  });
};

main();
