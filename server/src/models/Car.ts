import {
  Column,
  Table,
  Model,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import EngineType from './EngineType';
import Transmission from './Transmission';

@Table
export default class Car extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  image: string;

  @Column
  brand: string;

  @Column
  model: string;

  @Column
  color: string;

  @Column
  price: number;

  @Column
  year: number;

  @Column
  range: number;

  @ForeignKey(() => Transmission)
  @Column
  transmissionId: number;

  @ForeignKey(() => EngineType)
  @Column
  engineId: number;

  @BelongsTo(() => EngineType)
  engine: EngineType;

  @BelongsTo(() => Transmission)
  transmission: Transmission;
}
