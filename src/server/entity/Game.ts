import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable
} from 'typeorm';
import { User } from './User';

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  price: number;

  @Column()
  averageRating: number;

  @ManyToMany(() => User)
  @JoinTable()
  users: User[];
}
