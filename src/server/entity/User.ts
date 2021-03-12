import { Field, ObjectType, ID } from 'type-graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity
} from 'typeorm';
import Review from './Review';

@ObjectType()
@Entity()
export default class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field(() => [Review])
  @OneToMany(() => Review, (review) => review.reviewer)
  reviews: Review[];
}
