import { Column, Table, Model, HasMany } from 'sequelize-typescript';

@Table
export class User extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  username: string;

  @Column
  password: string;

  @Column
  email: string;
}
