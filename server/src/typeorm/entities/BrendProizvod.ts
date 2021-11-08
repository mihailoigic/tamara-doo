import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn, OneToOne,
} from 'typeorm';

import { BrendSifrarnik } from './Brend';
import { Proizvod } from './Proizvod';

@Entity('proizvodBrend')
export class ProizvodBrend {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('int', { name: 'forbrend', nullable: true })
    forBrendId: number | null;

    @Column('int', { name: 'forproizvod', nullable: true })
    forProizvodId: number | null;

    @ManyToOne(() => Proizvod, (proizvod) => proizvod.proizvodBrend, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn([{ name: 'forproizvod', referencedColumnName: 'id' }])
    forBrendProizvod: Proizvod;

    @ManyToOne(() => BrendSifrarnik, (brend) => brend.brendProizvod, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn([{ name: 'forbrend', referencedColumnName: 'id' }])
    forBrendSifrarnik: BrendSifrarnik;
}
