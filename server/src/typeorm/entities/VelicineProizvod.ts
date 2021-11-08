import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';

import { VelicineSifrarnik } from './Velicine';
import { Proizvod } from './Proizvod';

@Entity('proizvodVelicina')
export class ProizvodVelicina {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('int', { name: 'forvelicina', nullable: true })
    forVelicinaId: number | null;

    @Column('int', { name: 'forproizvod', nullable: true })
    forProizvodId: number | null;

    @ManyToOne(() => Proizvod, (proizvod) => proizvod.proizvodVelicina, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn([{ name: 'forproizvod', referencedColumnName: 'id' }])
    forVelicinaProizvod: Proizvod;

    @ManyToOne(() => VelicineSifrarnik, (velicina) => velicina.velicinaProizvod, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn([{ name: 'forvelicina', referencedColumnName: 'id' }])
    forVelicinaSifrarnik: VelicineSifrarnik;
}
