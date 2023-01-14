import { IncomingMessage } from 'http';

export interface Request extends IncomingMessage {
  path: string;
  splitedPath: string[];
  body: string;
  params: {
    id: string;
  };
}
