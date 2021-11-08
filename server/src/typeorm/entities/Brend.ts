import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, OneToOne} from 'typeorm';
import { ProizvodBrend } from "./BrendProizvod";

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
}
