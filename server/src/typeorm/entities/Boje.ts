import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';

import { ProizvodBoja } from './BojeProizvod';

@Entity('bojaSifrarnik')
export class BojaSifrarnik {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  naziv: string;

  @OneToMany(() => ProizvodBoja, (proizvodBoja) => proizvodBoja.forBojaSifrarnik)
  bojaProizvod: ProizvodBoja[];
}
