import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany} from 'typeorm';
import {KategorijaTipPodtip} from "./KategorijaTipPodtip";
import {KategorijaTip} from "./KategorijaTip";
import {DiscountBoja} from "./DiscountBoja";
import {DiscountKategorija} from "./DiscountKategorija";

@Entity('kategorijeSifrarnik')
export class KategorijeSifrarnik {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true,
    })
    naziv: string;

    @OneToMany(() => KategorijaTipPodtip, (kategorijaTipPodtip) => kategorijaTipPodtip.forKategorijaSifrarnik)
    kategorijaTipPodtip: KategorijaTipPodtip[];

    @OneToMany(() => KategorijaTip, (kategorijaTip) => kategorijaTip.forKategorijaSifrarnik)
    kategorijaTip: KategorijaTip[];

    @OneToMany(() => DiscountKategorija, (discountKategorija) => discountKategorija.forKategorijaSifrarnik)
    kategorijaDiscount: DiscountKategorija[];
}
