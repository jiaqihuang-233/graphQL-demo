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
    const existingReview = await this.review({ gameId, reviewerId });
    if(existingReview) throw new Error('User has already reviewed this game.')
    const newReview = await this.reviewService.save({
      gameId,
      reviewerId,
      rating: Math.min(Math.max(rating, 0), 5),
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
    topics: NEW_REVIEW_ADDED_EVENT
  })
  newReviewAdded(
    @Root() newReviewPayload: Review
  ): Review {
    return newReviewPayload;
  }
}
