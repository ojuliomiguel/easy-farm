import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Farm } from './farm.entity';

@Entity()
export class CultivationArea {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @OneToMany(() => Farm, farm => farm.cultivationArea)
  farms: Farm[];
}
