import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { BojaSifrarnik } from './Boje';
import { Proizvod } from './Proizvod';

@Entity('proizvodBoja')
export class ProizvodBoja {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int', { name: 'forboja', nullable: true })
  forBojaId: number | null;

  @Column('int', { name: 'forproizvod', nullable: true })
  forProizvodId: number | null;

  @ManyToOne(() => Proizvod, (proizvod) => proizvod.proizvodBoja, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn([{ name: 'forproizvod', referencedColumnName: 'id' }])
  forBojaProizvod: Proizvod;

  @ManyToOne(() => BojaSifrarnik, (boja) => boja.bojaProizvod, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn([{ name: 'forboja', referencedColumnName: 'id' }])
  forBojaSifrarnik: BojaSifrarnik;
}
