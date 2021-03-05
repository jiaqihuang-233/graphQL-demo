import { Game } from '../entity/Game';
import { User } from '../entity/User';
import { Review } from '../entity/Review';
import { getRepository } from "typeorm";

// type Query {
//   game(id: ID, title: String!): Game
//   user(id: ID!): User
//   review(userId: ID!, gameId: ID!): Review
// }

const game = async (p, args, context, info) => {
  const { id, title } = args;
  const game = await getRepository(Game).findOne(id);
  return game;
};

const user = async (p, args, context, info) => {
  const { id } = args;
  return context.entityManager.findOne(User, id);
};

const review = async (p, args, context, info) => {
  const { userId, gameId } = args;
  return context.entityManager.find(Review, {
    where: { reviewerId: userId, gameId: gameId }
  });
};

export default {
  game,
  user,
  review
};
