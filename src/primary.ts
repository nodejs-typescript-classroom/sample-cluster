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
