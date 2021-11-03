import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('kategorijeSifrarnik')
export class KategorijeSifrarnik {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true,
    })
    naziv: string;

    // fk ka bojaProizvod
}
