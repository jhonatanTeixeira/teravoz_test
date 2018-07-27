import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {CustomerService} from './service/customer.service';
import {Customer} from './entity/customer.entity';
import {WebhookEvent} from './entity/webhookEvent.entity';
import {WebhookEventService} from './service/webhookEvent.service';
import {Configuration} from './entity/configuration.entity';
import {ConfigurationService} from './service/configuration.service';

@Module({
    imports: [TypeOrmModule.forFeature([Customer, WebhookEvent, Configuration])],
    providers: [CustomerService, WebhookEventService, ConfigurationService],
    exports: [CustomerService, WebhookEventService, ConfigurationService],
})
export class DomainModule {}