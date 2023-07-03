# sample cluster

This is repo is a demo for how to use cluster module to balance the heavily loading for nodejs server

## pre-install

1. loadtest for benchmark test
2. pm2 for demo cluster mode without modify code


## origin heavy service
```typescript
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

```
## test with benchmark with loadtest in original mode

```shell
npx loadtest -n 1200 -c 400 -k http://localhost:3000/heavy
```

## use cluster mode

```typescript
import { Logger } from '@nestjs/common';
import * as _cluster from 'cluster';
const cluster = _cluster as unknown as _cluster.Cluster;
import * as os from 'os';
import * as path from 'path';
const cpuCount = os.cpus().length;
const logger = new Logger('Primary');
logger.log({
  message: `The total number of CPUs is ${cpuCount}, primary pid=${process.pid}`,
});
cluster.setupPrimary({
  exec: path.join(__dirname, 'main.js'),
});
for (let i = 0; i < cpuCount; i++) {
  cluster.fork();
}
cluster.on('exit', (worker, code, signal) => {
  logger.log({
    messsage: `worker ${worker.process.pid} has been killed with ${signal}, Starting another worker`,
  });
  cluster.fork();
});
```

## run with cluster mode

```shell
nest start --entryFile primary
```

```shell
npx loadtest -n 1200 -c 400 -k http://localhost:3000/heavy
```

after test with cluster mode will faster 6 times

## run with cluster with pm2

```shell
pm2 start dist/main.js -i max --name nest
```

