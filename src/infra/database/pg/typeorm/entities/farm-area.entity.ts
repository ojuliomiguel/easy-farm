import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';

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
}
