import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany
} from 'typeorm';
import { User } from './User';
import { Review } from './Review';
@Entity()
export class Game {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  price: number;

  @OneToMany(() => Review, (review) => review.game)
  @JoinTable()
  reviews: Review[];

  //@TODO
  @ManyToMany(() => User, (user) => user.gamesInLibrary)
  @JoinTable()
  users: User[];
}
