import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Game } from './Game';
import { User } from './User';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  game: Game;

  @Column()
  rating: number;

  @ManyToOne(() => User, (user) => user.reviews)
  user: User;
}
