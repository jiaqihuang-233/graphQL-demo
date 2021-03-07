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
  Root,
  Int,
  Args,
  ArgsType,
  Subscription,
  ObjectType,
  PubSub,
  PubSubEngine
} from 'type-graphql';
import User from '../entity/User';
import Game from '../entity/Game';
import Review from '../entity/Review';
import { getRepository, Repository } from 'typeorm';

@ArgsType()
class GetReviewArgs {
  @Field(() => ID)
  gameId: string;

  @Field(() => ID)
  reviewerId: string;
}

@InputType()
class NewReviewInput {
  @Field(() => ID)
  gameId: string;

  @Field(() => ID)
  reviewerId: string;

  @Field(() => Int)
  rating: number;

  @Field()
  comment: string;
}

const NEW_REVIEW_ADDED_EVENT = 'NEW_REVIEW_ADDED';
 @ArgsType()
 class NewReviewArgs {
   @Field(() => [ID])
   subscribedGameIds: string[];
 }

@Resolver(() => Review)
export class ReviewResolver {
  private userService: Repository<User>;
  private gameService: Repository<Game>;
  private reviewService: Repository<Review>;

  constructor() {
    this.userService = getRepository(User);
    this.gameService = getRepository(Game);
    this.reviewService = getRepository(Review);
  }

  @Query(() => Review)
  async review(
    @Args() { reviewerId, gameId }: GetReviewArgs
  ): Promise<Review | undefined> {
    const review = await this.reviewService.findOne({
      cache: 1000,
      where: {
        game: { id: gameId },
        reviewer: { id: reviewerId }
      }
    });
    return review;
  }

  @Mutation(() => Review)
  async addReview(
    @Arg('input') input: NewReviewInput,
    @PubSub() pubsub: PubSubEngine
  ): Promise<Review | undefined> {
    const { gameId, reviewerId, rating, comment } = input;
    const reviewer = this.userService.findOne(reviewerId, {
      relations: ['reviews']
    });
    const game = this.gameService.findOne(gameId);
    if (!reviewer || !game) throw new Error('no game or user');
    const newReview = await this.reviewService.save({
      gameId,
      reviewerId,
      rating,
      comment
    });
    pubsub.publish(NEW_REVIEW_ADDED_EVENT, newReview);
    return newReview;
  }

  @FieldResolver()
  async game(@Root() review: Review): Promise<Game | undefined> {
    return this.gameService.findOne(review.gameId);
  }

  @FieldResolver()
  async reviewer(@Root() review: Review): Promise<User | undefined> {
    return this.userService.findOne(review.reviewerId);
  }

  @Subscription({
    topics: NEW_REVIEW_ADDED_EVENT,
    filter: ({ payload, args }) => {
      const { subscribedGameIds } = args;
      if(!subscribedGameIds || subscribedGameIds.length === 0) return true;
      return subscribedGameIds.includes(payload.gameId);
    }
  })
  newReviewAdded(
    @Root() newReviewPayload: Review,
    @Args() args: NewReviewArgs
  ): Review {
    return newReviewPayload;
  }
}
