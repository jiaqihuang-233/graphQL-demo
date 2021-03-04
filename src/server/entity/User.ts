import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany
} from 'typeorm';
import { Game } from './Game';
import { Review } from './Review';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Game)
  @JoinTable()
  gamesInLibrary: Game[];

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];
}
