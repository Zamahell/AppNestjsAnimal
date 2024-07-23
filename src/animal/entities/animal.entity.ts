import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Animal {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({type: 'tinyint', default: 0})
    adopted: number;
}
