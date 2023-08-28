import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggingService extends ConsoleLogger {
  writeError(message: string): void {
    this.error(message);
  }

  logRequest(req: Request): void {
    this.setContext('Request');
    const [_, url, param] = req.baseUrl.split('/');
    const reqMessage = `URL: /${url} - PARAMETER: ${param} - METHOD: ${
      req.method
    } - BODY: ${JSON.stringify(req.body)}`;
    this.log(reqMessage);
  }

  logResponse(res: Response): void {
    this.setContext('Response');
    const resMessage = `STATUS CODE: ${res.statusCode}`;
    this.log(resMessage);
  }
}
