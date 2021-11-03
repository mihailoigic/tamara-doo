import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('tipSifrarnik')
export class TipSifrarnik {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true,
    })
    naziv: string;

    // fk ka bojaProizvod
}
