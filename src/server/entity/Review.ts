import { Entity, PrimaryGeneratedColumn, Column, RelationId, ManyToOne, BaseEntity, CreateDateColumn } from 'typeorm';
import Game from './Game';
import User from './User';
import { Field, ObjectType, Int, ID } from 'type-graphql';
@ObjectType()
@Entity()
export default class Review extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => Game)
  @ManyToOne(() => Game)
  game: Game;
  @Column()
  @RelationId((review: Review) => review.game)
  gameId: string;

  @Field(() => Int)
  @Column()
  rating: number;

  @Field()
  @Column()
  comment: string;

  @Field(() => User)
  @ManyToOne(() => User)
  reviewer: User;
  @Column()
  @RelationId((review: Review) => review.reviewer)
  reviewerId: string;

  @Field()
  @CreateDateColumn()
  dateCreated: Date;
}
