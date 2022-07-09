import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Article } from '../../articles/entities/article.entity';

@Entity()
class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public username: string;

  @Column({ nullable: true })
  avatar?: string;

  @OneToMany(() => Article, (a) => a.user)
  articles: Article[];

  @Column()
  @Exclude({ toPlainOnly: true })
  public password: string;
}

export default User;
