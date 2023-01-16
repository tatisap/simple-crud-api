import * as dotenv from 'dotenv';
dotenv.config();

import cluster from 'node:cluster';
import { cpus } from 'node:os';
import { PORT } from './config';
import { server } from './server';

const numCPUs = cpus().length;

if (cluster.isPrimary) {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork({ PORT: Number(PORT) + i + 1 });
  }
}

server.listen(PORT, () => console.log(`Server is running at ${PORT} port`));
