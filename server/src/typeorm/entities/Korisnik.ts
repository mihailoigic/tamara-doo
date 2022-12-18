import bcrypt from 'bcryptjs';
import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany} from 'typeorm';
import {CartItem} from "./CartItem";
import {Cart} from "./Cart";

@Entity('korisnici')
export class Korisnik {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    ime: string;

    @Column()
    prezime: string;

    @Column()
    adresa: string;

    @Column()
    grad: string;

    @Column()
    telefon: string;

    @Column()
    email: string;

    @Column({
        name: 'brojstana',
        nullable: true,
    })
    brojStana: string;

    @Column({
        name: 'createdat'
    })
    createdAt: Date;

    @OneToMany(() => Cart, (cart) => cart.korisnikId)
    carts: Cart[];
}
