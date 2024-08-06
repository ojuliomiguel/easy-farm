import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Farm } from './farm.entity';

@Entity()
export class CultivationArea {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @ManyToOne(() => Farm, farm => farm.cultivationAreas, { onDelete: 'CASCADE' })
  farm: Farm;
}
