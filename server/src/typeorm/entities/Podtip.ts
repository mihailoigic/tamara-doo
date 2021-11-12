import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany} from 'typeorm';
import {KategorijaTipPodtip} from "./KategorijaTipPodtip";

@Entity('podtipSifrarnik')
export class PodtipSifrarnik {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true,
    })
    naziv: string;

    @OneToMany(() => KategorijaTipPodtip, (kategorijaTipPodtip) => kategorijaTipPodtip.forPodtipSifrarnik)
    kategorijaTipPodtip: KategorijaTipPodtip[];
}
