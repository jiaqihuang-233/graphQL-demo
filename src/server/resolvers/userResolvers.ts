import {
  Resolver,
  Query,
  Mutation,
  ResolverInterface,
  Arg,
  InputType,
  Field,
  ID,
  FieldResolver,
  Root
} from 'type-graphql';
import User from '../entity/User';
import { getRepository, Repository } from 'typeorm';
import Game from '../entity/Game';
import Review from '../entity/Review';

@InputType()
class NewUserInput {
  @Field()
  name: string;
}

@InputType()
class GamePurchaseInput {
  @Field(() => ID)
  gameId: string;

  @Field(() => ID)
  userId: string;
}

@Resolver(() => User)
export class UserResolver {
  private userService: Repository<User>;

  constructor() {
    this.userService = getRepository(User);
  }

  @Query(() => User)
  async user(@Arg('id', (type) => ID) id: string): Promise<User | undefined> {
    return await this.userService.findOne(id);
  }

  @Mutation(() => User)
  async addUser(@Arg('input') input: NewUserInput): Promise<User> {
    return await this.userService.save({ name: input.name });
  }

  // @Mutation(() => User)
  // async purchaseGame(
  //   @Arg('input') input: GamePurchaseInput
  // ): Promise<User | undefined> {
  //   const { gameId, userId } = input;
  //   const user = await this.userService.findOne(userId);
  //   const game = await getRepository(Game).findOne(gameId);
  //   if (!user || !game) throw new Error(' user or game not found');
  //   return await this.userService.save({
  //     ...user,
  //     gamesInLibrary: [...(user?.gamesInLibrary || []), game]
  //   });
  // }

  // @FieldResolver()
  // async gamesInLibrary(@Root() user: User) {
  //   //load users with games inside
  //   const foundUser = await this.userService.findOne({
  //     where: { id: user.id },
  //     relations: ['gamesInLibrary']
  //   });
  //   return foundUser?.gamesInLibrary || [];
  // }

  @FieldResolver()
  async reviews(@Root() user: User) {
    return getRepository(Review).find({
      cache: 1000,
      where: { reviewer: { id: user.id } }
    });
  }
}
