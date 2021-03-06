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
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => Game)
  @JoinTable()
  gamesInLibrary: Game[];

  @OneToMany(() => Review, (review) => review.reviewer)
  reviews: Review[];
}
