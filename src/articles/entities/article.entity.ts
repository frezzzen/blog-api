import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Topic } from '../../topics/entities/topic.entity';
import User from '../../users/entity/user.entity';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  mainImage: string;

  @Column()
  body: string;

  @Column()
  shortBody: string;

  @Column()
  minRead: string;

  @Column({ default: 0 })
  likes: number;

  @Column({ default: 0 })
  dislikes: number;

  @ManyToOne(() => Topic, (t) => t.articles)
  topic: Topic;

  @ManyToOne(() => User, (u) => u.articles)
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
