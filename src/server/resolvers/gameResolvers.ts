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

  @Field({ nullable: true })
  imageUrl?: string;
}

@InputType()
class EditGameInput {
  @Field(type => ID)
  id: string;

  @Field({ nullable: true })
  title: string;

  @Field(() => Float, { nullable: true })
  price: number;

  @Field({ nullable: true })
  imageUrl: string;
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
    const { title, price, imageUrl } = input;
    return await getRepository(Game).save({ title, price, imageUrl });
  }

  @Mutation(()=> Game)
  async editGame(@Arg('input') input: EditGameInput): Promise<Game> {
    const { id } = input;
    const game = await getRepository(Game).findOne(input.id);
    if(!game) throw new Error('Game not found');
    return await getRepository(Game).save({
      ...game,
      ...input
    });
  }

  @FieldResolver()
  async reviews(@Root() game: Game): Promise<Review[]> {
    return getRepository(Review).find({
      where: {
        gameId: game.id
      }
    });
  }

  @FieldResolver()
  async averageRating(@Root() game: Game): Promise<number | null> {
    const reviews = await this.reviews(game);
    const count = reviews.length;
    if (count === 0) return null;
    const sum = reviews
      .map((review) => review.rating)
      .reduce((a, b) => a + b, 0);
    return sum / count;
  }
}
