import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from 'typeorm';
import {Proizvod} from "./Proizvod";

@Entity('discountone')
export class DiscountOne {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    procenat: number;

    @Column('int', { name: 'forproizvod', nullable: true })
    forProizvodId: number | null;

    @ManyToOne(() => Proizvod, (proizvod) => proizvod.discountOne, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
    @JoinColumn([{ name: 'forproizvod', referencedColumnName: 'id' }])
    forDiscountOneProizvod: Proizvod;
}
