import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('heavy')
  doHeavyJob(): string {
    return this.appService.doHeavyJob();
  }
}
