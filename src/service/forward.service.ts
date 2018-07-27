import {Customer} from '../domain/entity/customer.entity';
import {ConfigurationService} from '../domain/service/configuration.service';
import {ActionTransfer} from '../domain/transfer/action.transfer';
import {WebhookEvent} from '../domain/entity/webhookEvent.entity';
import {WebhookEventService} from '../domain/service/webhookEvent.service';
import {TeravozClient} from './teravoz.client';
import {Injectable} from '@nestjs/common';
import {AxiosResponse} from '@nestjs/common/http/interfaces/axios.interfaces';

@Injectable()
export class ForwardService {
    constructor(
        private configurationService: ConfigurationService,
        private teravozClient: TeravozClient,
    ) {}

    async forwardCustomerCall(customer: Customer, webhookEvent: WebhookEvent): Promise<AxiosResponse> {
        if (webhookEvent.type !== WebhookEventService.startEvent) {
            throw new Error('only starting caal can be forwarded');
        }

        let forwardLine: string;

        if (customer.isNewCustomer) {
            forwardLine = await this.configurationService.getConfigurationValue('new_customer_line', '900');
        } else {
            forwardLine = await this.configurationService.getConfigurationValue('returning_customer_line', '901');
        }

        const action = new ActionTransfer('delegate', webhookEvent.callId, forwardLine);
        return await this.teravozClient.sendAction(action);
    }
}