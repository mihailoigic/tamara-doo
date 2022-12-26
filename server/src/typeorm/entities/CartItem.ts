import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from 'typeorm';
import {Proizvod} from "./Proizvod";
import {Cart} from "./Cart";

@Entity('cartitems')
export class CartItem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    boja: string;

    @Column()
    velicina: string;

    @Column({
        name: 'dubinakorpe'
    })
    dubinaKorpe: string;

    @Column()
    kolicina: number;

    @Column()
    cena: number;

    @ManyToOne(() => Proizvod, (proizvod) => proizvod.cartItems, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn([{ name: 'proizvodid', referencedColumnName: 'id' }])
    proizvodId: Proizvod;

    @ManyToOne(() => Cart, (cart) => cart.cartItems, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn([{ name: 'cartid', referencedColumnName: 'id' }])
    cartId: Cart;
}
