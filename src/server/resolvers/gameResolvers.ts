import {
  Resolver,
  Query,
  Mutation,
  Arg,
  InputType,
  Field,
  Float,
  ID,
  FieldResolver,
  Root
} from 'type-graphql';
import Game from '../entity/Game';
import Review from '../entity/Review';
import { getRepository } from 'typeorm';

@InputType()
class NewGameInput {
  @Field()
  title: string;

  @Field(() => Float)
  price: number;
}

@Resolver(() => Game)
export class GameResolver {
  @Query(() => Game)
  async game(@Arg('id', (type) => ID) id: string): Promise<Game | undefined> {
    return await getRepository(Game).findOne(id);
  }

  @Query(() => [Game])
  async getAllGames(): Promise<Game[]> {
    return getRepository(Game).find({ skip: 0, take: 20 });
  }

  @Mutation(() => Game)
  async addGame(@Arg('input') input: NewGameInput): Promise<Game> {
    const { title, price } = input;
    return await getRepository(Game).save({ title, price });
  }

  @FieldResolver()
  async reviews(@Root() game: Game): Promise<Review[]> {
    return getRepository(Review).find({
      where: {
        gameId: game.id
      }
    });
  }
}