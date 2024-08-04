import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { FarmArea } from './farm-area.entity';
import { Farmer } from './farmer.entity';
import { CultivationArea } from './cultivation-area.entity';

@Entity()
export class Farm {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @OneToOne(() => FarmArea, farmArea => farmArea)
  @JoinColumn()
  farmArea: FarmArea;

  @ManyToOne(() => Farmer, farmer => farmer.farm)
  farmer: Farmer;

  @ManyToOne(() => CultivationArea, cultivationArea => cultivationArea.farms)
  @JoinColumn()
  cultivationArea: CultivationArea;

}
