import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Farm } from './farm.entity';

@Entity()
export class FarmArea {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('float')
  totalArea: number;

  @Column('float')
  cultivableArea: number;

  @Column('float')
  vegetationArea: number;

  @OneToOne(() => Farm, farm => farm.farmArea, { cascade: true })
  farm: Farm;
}
