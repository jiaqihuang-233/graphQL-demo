import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity
} from 'typeorm';
import Review from './Review';
import { Field, ObjectType, Float, ID} from 'type-graphql';

@ObjectType()
@Entity()
export default class Game extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  title: string;

  @Field(() => Float)
  @Column()
  price: number;

  @Field(() => String, { nullable: true })
  @Column({ nullable : true })
  imageUrl: string;

  @Field(() => [Review])
  @OneToMany(() => Review, (review) => review.game)
  reviews: Review[];

  @Field(() => Float, { nullable: true })
  averageRating: number;
}
