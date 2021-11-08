import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn, OneToOne,
} from 'typeorm';

import { Proizvod } from './Proizvod';

@Entity('proizvodSlike')
export class ProizvodSlike {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('int', { name: 'forproizvod', nullable: true })
    forProizvodId: number | null;

    @Column('character varying', {
        name: 'urlslike',
        nullable: true,
        length: 1000,
    })
    urlSlike: string | null;

    @ManyToOne(() => Proizvod, (proizvod) => proizvod.proizvodSlike, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn([{ name: 'forproizvod', referencedColumnName: 'id' }])
    forSlikeProizvod: Proizvod;
}
