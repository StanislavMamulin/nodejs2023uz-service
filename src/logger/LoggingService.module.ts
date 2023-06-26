import { Module } from '@nestjs/common';
import { LoggingService } from './LoggingService.service';

@Module({
  providers: [LoggingService],
  exports: [LoggingService],
})
export class LoggingModule {}
