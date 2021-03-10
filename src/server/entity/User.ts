import { Field, Float, ObjectType, ID } from 'type-graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
  BaseEntity
} from 'typeorm';
import Game from './Game';
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

  // @Field(() => [Game])
  // @ManyToMany(() => Game)
  // @JoinTable()
  // gamesInLibrary: Game[];

  @Field(() => [Review])
  @OneToMany(() => Review, (review) => review.reviewer)
  reviews: Review[];
}
