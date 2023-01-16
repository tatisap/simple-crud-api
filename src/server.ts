import http from 'node:http';
import { App } from './app';

const server = http.createServer(App.listenRequest);

export { server };
