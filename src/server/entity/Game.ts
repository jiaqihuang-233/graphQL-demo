import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
  BaseEntity
} from 'typeorm';
import User from './User';
import Review from './Review';
import { Field, ObjectType, Float, ID } from 'type-graphql';

`type Game {
    id: ID!
    title: String!
    averageRating: Int!
    reviews: [Review!]!
  }
  `;
@ObjectType()
@Entity()
export default class Game extends BaseEntity {
  @Field((type) => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  title: string;

  @Field(() => Float)
  @Column()
  price: number;

  @Field(() => Float, { nullable: true })
  get averageRating(): number | null {
    const count = this.reviews.length;
    if (count === 0) return null;
    const sum = this.reviews
      .map((review) => review.rating)
      .reduce((a, b) => a + b, 0);
    return sum / count;
  }

  @Field((type) => [Review])
  @OneToMany(() => Review, (review) => review.game)
  reviews: Review[];
}

// @ObjectType()
// @Entity()
// export class Game  extends BaseEntity{
//   @Field()
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @Field()
//   @Column()
//   title: string;

//   @Field(() => Float)
//   @Column()
//   price: number;

//   @Field(() => [Review])
//   @OneToMany(() => Review, (review) => review.game)
//   @JoinTable()
//   reviews: Review[];

//   @Field(() => [User])
//   @ManyToMany(() => User, (user) => user.gamesInLibrary)
//   @JoinTable()
//   users: User[];
// }
