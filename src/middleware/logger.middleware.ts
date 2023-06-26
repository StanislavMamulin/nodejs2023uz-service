import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { LoggingService } from '../logger/LoggingService.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: LoggingService) {}

  use(req: Request, res: Response, next: NextFunction) {
    this.logger.logRequest(req);

    res.on('finish', () => {
      this.logger.logResponse(res);
    });

    if (next) {
      next();
    }
  }
}