import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('podtipSifrarnik')
export class PodtipSifrarnik {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true,
    })
    naziv: string;

    // fk ka bojaProizvod
}
