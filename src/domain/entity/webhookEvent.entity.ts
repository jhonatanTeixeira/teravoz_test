import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import Serialize from 'serialazy/lib/dist/decorators/serialize';
import {ApiModelProperty} from '@nestjs/swagger';

@Entity()
export class WebhookEvent {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Serialize()
    type: string;

    @Column()
    @Serialize({name: 'call_id'})
    callId: string;

    @Column()
    @Serialize()
    code: string;

    @Column()
    @Serialize()
    direction: string;

    @Column()
    @Serialize({name: 'our_number'})
    ourNumber: string;

    @Column()
    @Serialize({name: 'their_number'})
    theirNumber: string;

    @Column()
    @Serialize({name: 'their_number_type'})
    theirNumberType: string;

    @Column()
    @Serialize.Custom({
        down: (date: Date) => date.toISOString(),
        up: (isoDateStr: string) => new Date(isoDateStr),
    })
    timestamp: Date;
}