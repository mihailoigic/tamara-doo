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

@Entity('discountboja')
export class DiscountBoja {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('int', { name: 'forboja', nullable: true })
    forBojaId: number | null;

    @Column('int', { name: 'fordiscount', nullable: true })
    forDiscountId: number | null;

    @ManyToOne(() => Discount, (discount) => discount.boje, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
    @JoinColumn([{ name: 'fordiscount', referencedColumnName: 'id' }])
    forBojaDiscount: Proizvod;

    @ManyToOne(() => BojaSifrarnik, (boja) => boja.bojaDiscount, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
    @JoinColumn([{ name: 'forboja', referencedColumnName: 'id' }])
    forBojaSifrarnik: BojaSifrarnik;
}
