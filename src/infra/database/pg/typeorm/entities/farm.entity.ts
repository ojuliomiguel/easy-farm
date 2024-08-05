import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { FarmArea } from './farm-area.entity';
import { FarmerTypeOrmEntity as Farmer } from './farmer.entity';
import { CultivationArea } from './cultivation-area.entity';

@Entity()
export class Farm {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @OneToOne(() => FarmArea, { cascade: true })
  @JoinColumn()
  farmArea: FarmArea;

  @ManyToOne(() => Farmer, farmer => farmer.farms) 
  farmer: Farmer;

  @ManyToOne(() => CultivationArea, cultivationArea => cultivationArea.farms, { cascade: true, nullable: true })
  @JoinColumn()
  cultivationArea?: CultivationArea;

}
