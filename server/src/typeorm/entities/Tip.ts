import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany} from 'typeorm';
import {KategorijaTipPodtip} from "./KategorijaTipPodtip";
import {KategorijaTip} from "./KategorijaTip";

@Entity('tipSifrarnik')
export class TipSifrarnik {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true,
    })
    naziv: string;

    @OneToMany(() => KategorijaTipPodtip, (kategorijaTipPodtip) => kategorijaTipPodtip.forTipSifrarnik)
    kategorijaTipPodtip: KategorijaTipPodtip[];

    @OneToMany(() => KategorijaTip, (kategorijaTip) => kategorijaTip.forTipSifrarnik)
    kategorijaTip: KategorijaTip[];

}
