import { Module } from '@nestjs/common';
import { PolygonService } from './polygon.service';
import { HttpModule } from '../http/http.module';

@Module({
  imports: [HttpModule],
  providers: [PolygonService],
  exports: [PolygonService],
})
export class PolygonModule {}
