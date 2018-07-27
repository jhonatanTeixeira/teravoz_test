import {HttpService, Injectable} from '@nestjs/common';
import {ActionTransfer} from '../domain/transfer/action.transfer';
import {ConfigurationService} from '../domain/service/configuration.service';
import {deflate} from 'serialazy';
import {Observable} from 'rxjs/index';
import {AxiosResponse} from '@nestjs/common/http/interfaces/axios.interfaces';

@Injectable()
export class TeravozClient {
    readonly defaultTeravozUrl = 'https://api.teravoz.com.br/';

    constructor(
        private httpClient: HttpService,
        private configuration: ConfigurationService,
    ) {}

    async sendAction(actionTransfer: ActionTransfer) {
        const teravozUrl = await this.configuration.getConfigurationValue('teravoz_api_url', this.defaultTeravozUrl) + '/actions';
        const teravozCredentials = await this.configuration.getConfigurationValue('teravoz_api_credentials', 'root:root');

        return await this.httpClient
            .post(teravozUrl, deflate(actionTransfer), {headers: {Authorization: `Basic: ${Buffer.from(teravozCredentials).toString('base64')}`}});
    }
}