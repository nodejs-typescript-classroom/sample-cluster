import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  doHeavyJob(): string {
    let total = 0;
    for (let i = 0; i < 50_000_000; i++) {
      total++;
    }
    return `The result of the CPU intensive task is ${total}`;
  }
}
