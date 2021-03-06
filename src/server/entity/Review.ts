import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { Game } from './Game';
import { User } from './User';

@Entity()
export class Review {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Game, (game) => game.reviews)
  game: Game;

  @Column()
  rating: number;

  @ManyToOne(() => User, (user) => user.reviews)
  reviewer: User;
}
