import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm';

import { BojaSifrarnik } from './Boje';
import { Proizvod } from './Proizvod';
import {Discount} from "./Discount";
import {KategorijeSifrarnik} from "./Kategorije";

@Entity('discountkategorija')
export class DiscountKategorija {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('int', { name: 'forkategorija', nullable: true })
    forKategorijaId: number | null;

    @Column('int', { name: 'fordiscount', nullable: true })
    forDiscountId: number | null;

    @ManyToOne(() => Discount, (discount) => discount.kategorije, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
    @JoinColumn([{ name: 'fordiscount', referencedColumnName: 'id' }])
    forKategorijaDiscount: Proizvod;

    @ManyToOne(() => KategorijeSifrarnik, (kategorija) => kategorija.kategorijaDiscount, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
    @JoinColumn([{ name: 'forkategorija', referencedColumnName: 'id' }])
    forKategorijaSifrarnik: BojaSifrarnik;
}
