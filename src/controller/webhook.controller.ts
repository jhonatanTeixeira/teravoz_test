import {Controller, Body, Post, HttpException, Res, HttpStatus} from '@nestjs/common';
import {WebhookEventService} from '../domain/service/webhookEvent.service';
import {CustomerService} from '../domain/service/customer.service';
import {ForwardService} from '../service/forward.service';
import {WebhookTransfer} from '../domain/transfer/webhook.transfer';
import JsonType from 'serialazy/lib/dist/types/json_type';
import {AxiosResponse} from '@nestjs/common/http/interfaces/axios.interfaces';

@Controller('webhook')
export class WebhookController {
    constructor(
        private webhookEventService: WebhookEventService,
        private customerService: CustomerService,
        private forwardService: ForwardService,
    ) {}

    @Post()
    async post(@Body() body: WebhookTransfer | JsonType) {
        try {
            const event = await this.webhookEventService.createEventFromRquestBody(body as JsonType);
            let customer = await this.customerService.getCustomerByNumber(event.theirNumber);

            if (customer === undefined) {
                customer = await this.customerService.createCustomerFromEvent(event);
            }

            if (body.type === WebhookEventService.startEvent) {
                const response = await this.forwardService.forwardCustomerCall(customer, event);
                return response.data;
            }
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.NOT_ACCEPTABLE);
        }
    }
}
