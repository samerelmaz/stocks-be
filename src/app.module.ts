import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StocksModule } from './apis/stocks/stocks.module';
import { LoggerModule } from './apis/logger/logger.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    LoggerModule,
    StocksModule,
  ],
})
export class AppModule {}
