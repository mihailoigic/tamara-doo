import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('emailList')
export class EmailList {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true,
    })
    email: string;
}
