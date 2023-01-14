import * as dotenv from 'dotenv';
dotenv.config();

import http from 'http';
import { App } from './app';

const server = http.createServer(App.listenRequest);

const port = process.env.PORT;

server.listen(port, () => console.log(`Server is running at ${port} port`));
