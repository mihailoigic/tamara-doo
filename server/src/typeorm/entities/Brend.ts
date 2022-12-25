import {Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne} from 'typeorm';
import { ProizvodBrend } from "./BrendProizvod";
import {DiscountBrend} from "./DiscountBrend";

@Entity('brendSifrarnik')
export class BrendSifrarnik {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true,
    })
    naziv: string;

    @OneToOne(()=> ProizvodBrend)
    brendProizvod: ProizvodBrend;

    @OneToMany(() => DiscountBrend, (discountBrend) => discountBrend.forBrendSifrarnik)
    brendDiscount: DiscountBrend[];
}
