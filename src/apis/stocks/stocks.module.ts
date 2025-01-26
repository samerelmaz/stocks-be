import { Module } from '@nestjs/common';
import { StocksController } from './stocks.controller';
import { StocksService } from './stocks.service';
import { PolygonModule } from '../polygon/polygon.module';

@Module({
  imports: [PolygonModule],
  controllers: [StocksController],
  providers: [StocksService],
})
export class StocksModule {}
