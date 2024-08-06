import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { FarmArea } from './farm-area.entity';
import { FarmerTypeOrmEntity as Farmer } from './farmer.entity';
import { CultivationArea } from './cultivation-area.entity';
import { FarmAddress } from './farm-adress.entity';

@Entity()
export class Farm {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @OneToOne(() => FarmAddress, { cascade: true })
  @JoinColumn()
  address: FarmAddress;

  @OneToOne(() => FarmArea, { cascade: true })
  @JoinColumn()
  farmArea: FarmArea;

  @ManyToOne(() => Farmer, farmer => farmer.farms, { onDelete: 'CASCADE' }) 
  farmer: Farmer;

  @OneToMany(() => CultivationArea, cultivationArea => cultivationArea.farm, { cascade: true })
  cultivationAreas?: CultivationArea[];

}
