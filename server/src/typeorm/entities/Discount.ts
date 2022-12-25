import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, ManyToOne, JoinColumn} from 'typeorm';
import {CartItem} from "./CartItem";
import {Korisnik} from "./Korisnik";
import {DiscountBoja} from "./DiscountBoja";
import {DiscountBrend} from "./DiscountBrend";
import {DiscountKategorija} from "./DiscountKategorija";

@Entity('discount')
export class Discount {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    naziv: string;

    @Column()
    procenat: number;

    @Column({
        name: 'datumod'
    })
    datumOd: Date;

    @Column({
        name: 'datumdo'
    })
    datumDo: Date;

    @OneToMany(() => DiscountBoja, (boja) => boja.forBojaDiscount)
    boje: DiscountBoja[];

    @OneToMany(() => DiscountBrend, (brend) => brend.forBrendDiscount)
    brendovi: DiscountBrend[];

    @OneToMany(() => DiscountKategorija, (kategorija) => kategorija.forKategorijaDiscount)
    kategorije: DiscountKategorija[];
}
