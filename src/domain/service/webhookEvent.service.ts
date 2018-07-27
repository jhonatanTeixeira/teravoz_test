import {Repository} from 'typeorm';
import {WebhookEvent} from '../entity/webhookEvent.entity';
import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {deflate, inflate} from 'serialazy';
import {WebhookTransfer} from '../transfer/webhook.transfer';
import JsonType from 'serialazy/lib/dist/types/json_type';

@Injectable()
export class WebhookEventService {
    static readonly startEvent = 'call.new';

    static readonly finishEvent = 'call.finished';

    static readonly callTransitionTable = {
        'call.new': 'call.standby',
        'call.standby': 'call.waiting',
        'call.waiting': 'actor.entered',
        'actor.entered': 'call.ongoing',
        'call.ongoing': 'actor.left',
        'actor.left': 'call.finished',
    };

    constructor(
        @InjectRepository(WebhookEvent)
        private webhookEventRepository: Repository<WebhookEvent>,
    ) {}

    async createEventFromRquestBody(body: JsonType): Promise<WebhookEvent> {
        const webhookEvent = inflate(WebhookEvent, body);

        await this.validateEvent(webhookEvent);

        await this.webhookEventRepository.save(webhookEvent);

        return webhookEvent;
    }

    async validateEvent(webhookEvent: WebhookEvent) {
        const lastEvent = await this.webhookEventRepository.findOne({
            where: { callId: webhookEvent.callId },
            order: { id: 'DESC'},
        });

        if (lastEvent === undefined && webhookEvent.type !== WebhookEventService.startEvent) {
            throw new HttpException('call was not been registered', HttpStatus.INTERNAL_SERVER_ERROR);
        }

        if (webhookEvent.type === WebhookEventService.startEvent && lastEvent === undefined) {
            return;
        }

        const nextEventType = WebhookEventService.callTransitionTable[lastEvent.type];

        if (nextEventType !== webhookEvent.type) {
            throw new HttpException(`Invalid transition ${lastEvent.type} - ${webhookEvent.type}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}