import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm';

import { Proizvod } from './Proizvod';
import {Discount} from "./Discount";
import {BrendSifrarnik} from "./Brend";

@Entity('discountbrend')
export class DiscountBrend {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('int', { name: 'forbrend', nullable: true })
    forBrendId: number | null;

    @Column('int', { name: 'fordiscount', nullable: true })
    forDiscountId: number | null;

    @ManyToOne(() => Discount, (discount) => discount.brendovi, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn([{ name: 'fordiscount', referencedColumnName: 'id' }])
    forBrendDiscount: Proizvod;

    @ManyToOne(() => BrendSifrarnik, (brend) => brend.brendDiscount, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn([{ name: 'forbrend', referencedColumnName: 'id' }])
    forBrendSifrarnik: BrendSifrarnik;
}
