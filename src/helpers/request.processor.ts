import { ServerResponse } from 'http';
import { URL } from 'url';
import { STATUS_CODE } from '../constants/status.code';
import { isHttpError, NotFoundError } from '../errors';
import { Request } from '../types';

export class RequestProcessor {
  static processUrl = (req: Request): void => {
    const { url: reqUrl } = req;
    if (!reqUrl) {
      throw new NotFoundError('Resource you requested does not exist');
    }
    const url = new URL(reqUrl, `http://${req.headers.host}`);
    let { pathname } = url;
    pathname = pathname.slice(1);
    if (pathname.endsWith('/')) {
      pathname = pathname.slice(0, pathname.length - 1);
    }
    req.path = pathname;
    req.splitedPath = pathname.split('/');
  };

  static processBody = async (req: Request): Promise<void> => {
    const stringifiedBody: string = await new Promise((resolve, reject) => {
      let body = '';
      req.on('data', (chunk: Buffer) => (body += chunk.toString()));
      req.on('end', () => resolve(body));
      req.on('error', (err: Error) => reject(err));
    });
    req.body = stringifiedBody;
  };

  static processError = (error: unknown, res: ServerResponse): void => {
    if (isHttpError(error)) {
      const { statusCode, message } = error;
      res.writeHead(statusCode, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ statusCode, message }));
      return;
    }
    console.log(error);
    res.writeHead(STATUS_CODE.INTERNAL_SERVER_ERROR, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ statusCode: STATUS_CODE.INTERNAL_SERVER_ERROR, message: 'Internal server error' }));
  };

  static processNotExistingEndpoint = (res: ServerResponse): void => {
    res.writeHead(STATUS_CODE.NOT_FOUND, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ statusCode: STATUS_CODE.NOT_FOUND, message: 'Resource you requested does not exist' }));
  };
}
