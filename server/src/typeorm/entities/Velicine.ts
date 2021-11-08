import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany} from 'typeorm';
import { ProizvodVelicina } from "./VelicineProizvod";

@Entity('velicineSifrarnik')
export class VelicineSifrarnik {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true,
    })
    naziv: string;

    @OneToMany(() => ProizvodVelicina, (proizvodVelicina) => proizvodVelicina.forVelicinaProizvod)
    velicinaProizvod: ProizvodVelicina[];
}
