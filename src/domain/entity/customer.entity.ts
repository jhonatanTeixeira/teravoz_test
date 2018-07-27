import {AfterInsert, Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Customer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    number: string;

    @Column()
    numberType: string;

    @Column()
    firstCallDate: Date;

    isNewCustomer: boolean = false;

    @AfterInsert()
    markAsNew() {
        this.isNewCustomer = true;
        return this;
    }
}