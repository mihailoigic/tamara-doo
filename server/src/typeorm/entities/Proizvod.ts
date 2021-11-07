import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

import { ProizvodBoja } from './BojeProizvod';

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

  @OneToMany(() => ProizvodBoja, (proizvodBoja) => proizvodBoja.forBojaProizvod)
  proizvodBoja: ProizvodBoja[];
}
