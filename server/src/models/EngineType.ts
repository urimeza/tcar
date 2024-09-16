import { Column, Table, Model, HasMany } from 'sequelize-typescript';
import Car from './Car';

@Table
export default class EngineType extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  type: string;

  @HasMany(() => Car)
  car: Car[];
}
