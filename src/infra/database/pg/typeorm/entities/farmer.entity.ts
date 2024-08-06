import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Farm } from './farm.entity';

@Entity('farmer')
export class FarmerTypeOrmEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 11, nullable: true, unique: true })
  cpf: string | null;

  @Column({ type: 'varchar', length: 14, nullable: true, unique: true })
  cnpj: string | null;

  @OneToMany(() => Farm, farm => farm.farmer, { cascade: true, onDelete: 'CASCADE' })
  farms: Farm[];
}
