import {Customer} from '../entity/customer.entity';
import {Repository} from 'typeorm';
import {Injectable} from '@nestjs/common';
import {WebhookEvent} from '../entity/webhookEvent.entity';
import {InjectRepository} from '@nestjs/typeorm';

@Injectable()
export class CustomerService {
    constructor(
        @InjectRepository(Customer)
        private customerRepository: Repository<Customer>,
    ){}

    async createCustomerFromEvent(webhookEvent: WebhookEvent): Promise<Customer> {
        const customer = new Customer();

        customer.firstCallDate = new Date();
        customer.number = webhookEvent.theirNumber;
        customer.numberType = webhookEvent.theirNumberType;

        await this.customerRepository.save(customer);

        return customer;
    }

    getCustomerByNumber(phonenumber: string) {
        return this.customerRepository.findOne({ where: {number: phonenumber}});
    }
}