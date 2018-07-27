import Serialize from 'serialazy/lib/dist/decorators/serialize';
import {PrimaryGeneratedColumn} from 'typeorm';
import {ApiModelProperty} from '@nestjs/swagger';
import JsonType, {JsonArray} from 'serialazy/lib/dist/types/json_type';

export class WebhookTransfer {
    @ApiModelProperty({description: 'the event type'})
    type: string;

    @ApiModelProperty({description: 'unique call id'})
    call_id: string;

    @ApiModelProperty({description: 'the event code'})
    code: string;

    @ApiModelProperty({description: 'inbound or outbound'})
    direction: string;

    @ApiModelProperty({description: 'local number'})
    our_number: string;

    @ApiModelProperty({description: 'external number'})
    their_number: string;

    @ApiModelProperty({description: 'number type refers to phone type such as mobile or fixed'})
    their_number_type: string;

    @ApiModelProperty({description: 'the call event date and time', type: 'string', format: 'date-time'})
    timestamp: Date;
}