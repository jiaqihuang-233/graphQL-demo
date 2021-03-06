import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { createConnection } from './util/connection';
import { buildSchema } from 'type-graphql';
import { GameResolver } from './resolvers/gameResolvers';
import { UserResolver } from './resolvers/userResolvers';
import { ReviewResolver } from './resolvers/reviewResolvers';

const main = async () => {
  await createConnection();

 

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [GameResolver, UserResolver, ReviewResolver]
    })
  });

  const app = express();
  server.applyMiddleware({ app });

  app.listen({ port: 8000 }, () =>
    console.log(`🚀 Server ready at http://localhost:8000${server.graphqlPath}`)
  );
};

main();
