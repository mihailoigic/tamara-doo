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

@Entity('kategorijaTip')
export class KategorijaTip {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    pol: boolean;

    //forKatergorijaId
    @Column('int', { name: 'forkategorija', nullable: true })
    forKategorija: number | null;

    //forTipId
    @Column('int', { name: 'fortip', nullable: true })
    forTip: number | null;

    // fk ka katergoija
    @ManyToOne(() => KategorijeSifrarnik, (kategorija) => kategorija.kategorijaTipPodtip, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn([{ name: 'forkategorija', referencedColumnName: 'id' }])
    forKategorijaSifrarnik: KategorijeSifrarnik;

    // fk ka tip
    @ManyToOne(() => TipSifrarnik, (tip) => tip.kategorijaTipPodtip, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn([{ name: 'fortip', referencedColumnName: 'id' }])
    forTipSifrarnik: TipSifrarnik;
}
