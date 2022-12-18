import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, ManyToOne, JoinColumn} from 'typeorm';
import {CartItem} from "./CartItem";
import {Korisnik} from "./Korisnik";

@Entity('cart')
export class Cart {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    status: string;

    @Column()
    napomena: string;

    @Column({
        name: 'brojkupovine'
    })
    brojKupovine: string;

    @Column({
        name: 'createdat'
    })
    createdAt: Date;

    @OneToMany(() => CartItem, (cartItem) => cartItem.cartId)
    cartItems: CartItem[];

    @ManyToOne(() => Korisnik, (korisnik) => korisnik.carts, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn([{ name: 'korisnikid', referencedColumnName: 'id' }])
    korisnikId: Korisnik;
}
