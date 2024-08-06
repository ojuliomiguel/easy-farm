import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FarmAddress {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  state: string;
}
