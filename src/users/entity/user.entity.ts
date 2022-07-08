import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
class User {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  public username: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  public password: string;
}

export default User;
