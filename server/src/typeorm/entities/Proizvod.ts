import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
  JoinColumn
} from 'typeorm';

import { ProizvodBoja } from './BojeProizvod';
import { ProizvodVelicina } from './VelicineProizvod';
import { ProizvodBrend } from './BrendProizvod';
import { ProizvodSlike } from "./SlikeProizvod";
import {KategorijeSifrarnik} from "./Kategorije";
import {KategorijaTipPodtip} from "./KategorijaTipPodtip";

@Entity('proizvod')
export class Proizvod {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('character varying', {
    name: 'naziv',
    nullable: true,
    length: 1000,
  })
  naziv: string | null;

  @Column('character varying', {
    name: 'opis',
    nullable: true,
    length: 1000,
  })
  opis: string | null;

  @Column('character varying', {
    name: 'defaultslika',
    nullable: true,
    length: 1000,
  })
  defaultSlika: string | null;

  @Column()
  novo: boolean;

  @Column()
  moda: boolean;

  @Column()
  rod: number;

  @OneToMany(() => ProizvodBoja, (proizvodBoja) => proizvodBoja.forBojaProizvod)
  proizvodBoja: ProizvodBoja[];

  @OneToMany(() => ProizvodVelicina, (proizvodVelicina) => proizvodVelicina.forVelicinaProizvod)
  proizvodVelicina: ProizvodVelicina[];

  @OneToMany(() => ProizvodSlike, (proizvodSlike) => proizvodSlike.forSlikeProizvod)
  proizvodSlike: ProizvodSlike[];

  @OneToOne(() => ProizvodBrend, (proizvodBrend) => proizvodBrend.forBrendProizvod)
  proizvodBrend: ProizvodBrend;

  @OneToMany(() => KategorijaTipPodtip, (kategorijaTipPodtip) => kategorijaTipPodtip.forKategorijaProizvod)
  kategorijaTipPodtip: KategorijaTipPodtip[];
}
