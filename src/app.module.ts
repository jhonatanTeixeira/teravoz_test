import {HttpModule, Module} from '@nestjs/common';
import {DomainModule} from './domain/domain.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {WebhookController} from './controller/webhook.controller';
import {ForwardService} from './service/forward.service';
import {TeravozClient} from './service/teravoz.client';

@Module({
  imports: [TypeOrmModule.forRoot(), HttpModule, DomainModule],
  controllers: [WebhookController],
  providers: [ForwardService, TeravozClient],
})
export class AppModule {}
