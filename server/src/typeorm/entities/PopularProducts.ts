import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity('popularproducts')
export class PopularProducts {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    p1: number;

    @Column()
    p2: number;

    @Column()
    p3: number;

    @Column()
    p4: number;

    @Column()
    p5: number;


}
