import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Configuration {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    value: string;
}