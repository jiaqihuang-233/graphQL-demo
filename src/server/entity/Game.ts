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
import { Field, ObjectType, Float, ID} from 'type-graphql';

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

  @Field(() => String, { nullable: true })
  @Column({ nullable : true })
  imageUrl: string;

  @Field((type) => [Review])
  @OneToMany(() => Review, (review) => review.game)
  reviews: Review[];

  @Field(() => Float, { nullable: true })
  averageRating: number;
}
