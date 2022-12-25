import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';

import { ProizvodBoja } from './BojeProizvod';
import {DiscountBoja} from "./DiscountBoja";
import {Discount} from "./Discount";

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

  @OneToMany(() => DiscountBoja, (discountBoja) => discountBoja.forBojaSifrarnik)
  bojaDiscount: DiscountBoja[];
}
