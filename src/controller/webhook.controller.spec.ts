import { Test, TestingModule } from '@nestjs/testing';
import {WebhookController} from './webhook.controller';
import {WebhookEventService} from '../domain/service/webhookEvent.service';
import {ForwardService} from '../service/forward.service';
import {CustomerService} from '../domain/service/customer.service';
import {WebhookEvent} from '../domain/entity/webhookEvent.entity';
import {Repository} from 'typeorm';
import {getRepositoryToken, TypeOrmModule} from '@nestjs/typeorm';
import {Configuration} from '../domain/entity/configuration.entity';
import {Customer} from '../domain/entity/customer.entity';
import {ConfigurationService} from '../domain/service/configuration.service';
import {TeravozClient} from '../service/teravoz.client';
import {HttpService, INestApplication} from '@nestjs/common';
import {AxiosResponse} from '@nestjs/common/http/interfaces/axios.interfaces';
import JsonType from 'serialazy/lib/dist/types/json_type';

describe('WebhookController', () => {
    let webhookController: WebhookController;
    let webhookEventService: WebhookEventService;
    let customerService: CustomerService;
    let configurationService: ConfigurationService;
    let forwardService: ForwardService;
    let mockWebhookRepository: any;
    let customerRepository: Repository<Customer>;
    let configurationRepository: Repository<Configuration>;
    let app: INestApplication;
    let httpService: HttpService;

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            controllers: [WebhookController],
            providers: [
                WebhookEventService,
                CustomerService,
                ConfigurationService,
                ForwardService,
                TeravozClient,
                {
                    provide: getRepositoryToken(WebhookEvent),
                    useValue: mockWebhookRepository,
                },
                {
                    provide: getRepositoryToken(Customer),
                    useValue: customerRepository,
                },
                {
                    provide: getRepositoryToken(Configuration),
                    useValue: configurationRepository,
                },
                HttpService,
            ],
            imports: [
                TypeOrmModule.forFeature([WebhookEvent, Customer, Configuration]),
                TypeOrmModule.forRoot(),
            ],
        }).compile();

        webhookController = module.get<WebhookController>(WebhookController);
        webhookEventService = module.get<WebhookEventService>(WebhookEventService);
        customerService = module.get<CustomerService>(CustomerService);
        forwardService = module.get<ForwardService>(ForwardService);
        configurationService = module.get<ConfigurationService>(ConfigurationService);
        mockWebhookRepository = module.get<Repository<WebhookEvent>>(getRepositoryToken(WebhookEvent));
        customerRepository = module.get<Repository<Customer>>(getRepositoryToken(Customer));
        configurationRepository = module.get<Repository<Configuration>>(getRepositoryToken(Configuration));
        httpService = module.get<HttpService>(HttpService);
    });

    it('should register new call', async () => {
        jest.spyOn(mockWebhookRepository, 'save').mockImplementation(() => new WebhookEvent());
        jest.spyOn(customerRepository, 'save').mockImplementation(() => new Customer().markAsNew());
        jest.spyOn(mockWebhookRepository, 'findOne').mockImplementation(() => undefined);
        jest.spyOn(httpService, 'post').mockImplementation((): AxiosResponse => ({
            status: 200, statusText: 'ok', data: {response: 'success'}, headers: {}, config: {},
        }));

        const postData = {
            type: 'call.new',
            call_id: '12345678',
            code: '12345',
            direction: 'inbound',
            our_number: '123456789',
            their_number: '123456667',
            their_number_type: 'mobile',
            timestamp: '2018-10-10 10:10:10',
        };

        expect(await webhookController.post(postData)).toEqual({response: 'success'});
    });

    afterAll(async () => {
        await app.close();
    });
});
