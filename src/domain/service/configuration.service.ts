import {Repository} from 'typeorm';
import {Configuration} from '../entity/configuration.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {Injectable} from '@nestjs/common';

@Injectable()
export class ConfigurationService {
    constructor(
        @InjectRepository(Configuration)
        private configurationRepository: Repository<Configuration>,
    ) {}

    async getConfigurationValue(configurationName: string, defaultValue?: any): Promise<any> {
        const config = await this.configurationRepository.findOne({where: { name: configurationName}});

        if (config !== undefined) {
            return config.value;
        }

        return defaultValue;
    }
}