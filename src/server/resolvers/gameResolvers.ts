import {
  Resolver,
  Query,
  Mutation,
  ResolverInterface,
  Arg,
  InputType,
  Field,
  Float,
  ID
} from 'type-graphql';
import Game from '../entity/Game';
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
  async game(@Arg('id', type => ID) id: string): Promise<Game | undefined> {
    return await getRepository(Game).findOne(id);
  }

  @Mutation(() => Game)
  async addGame(@Arg('input') input: NewGameInput): Promise<Game> {
    const { title, price } = input;
    return await getRepository(Game).save({ title, price });
  }
}
