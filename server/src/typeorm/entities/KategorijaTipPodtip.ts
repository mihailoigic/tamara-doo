import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    OneToMany,
    ManyToOne, JoinColumn
} from 'typeorm';
import {KategorijeSifrarnik} from "./Kategorije";
import {TipSifrarnik} from "./Tip";
import {PodtipSifrarnik} from "./Podtip";
import {Proizvod} from "./Proizvod";

@Entity('kategorijaTipPodtip')
export class KategorijaTipPodtip {
    @PrimaryGeneratedColumn()
    id: number;

    //forKatergorijaId
    @Column('int', { name: 'forkategorija', nullable: true })
    forKategorija: number | null;

    //forTipId
    @Column('int', { name: 'fortip', nullable: true })
    forTip: number | null;
    //forPodtipId
    @Column('int', { name: 'forpodtip', nullable: true })
    forPodtip: number | null;

    // fk ka katergoija
    @ManyToOne(() => KategorijeSifrarnik, (kategorija) => kategorija.kategorijaTipPodtip, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn([{ name: 'forkategorija', referencedColumnName: 'id' }])
    forKategorijaSifrarnik: KategorijeSifrarnik;

    // fk ka tip
    @ManyToOne(() => TipSifrarnik, (tip) => tip.kategorijaTipPodtip, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn([{ name: 'fortip', referencedColumnName: 'id' }])
    forTipSifrarnik: TipSifrarnik;

    // fk ka podtip
    @ManyToOne(() => PodtipSifrarnik, (podtip) => podtip.kategorijaTipPodtip, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn([{ name: 'forpodtip', referencedColumnName: 'id' }])
    forPodtipSifrarnik: PodtipSifrarnik;

    // fk ka proizvod
    @ManyToOne(() => Proizvod, (proizvod) => proizvod.kategorijaTipPodtip, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn([{ name: 'forproizvod', referencedColumnName: 'id' }])
    forKategorijaProizvod: Proizvod;

}
