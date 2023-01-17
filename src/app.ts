import { IncomingMessage, ServerResponse } from 'http';
import { RequestProcessor } from './helpers/request.processor';
import { Request } from './types';
import { UserRouter } from './user/user.router';

export class App {
  static listenRequest = async (req: IncomingMessage, res: ServerResponse): Promise<void> => {
    try {
      RequestProcessor.processUrl(req as Request);
      await RequestProcessor.processBody(req as Request);
      const isEndpointFound = [UserRouter(req as Request, res)].some((result) => result);
      if (!isEndpointFound) {
        RequestProcessor.processNotExistingEndpoint(res);
      }
    } catch (error: unknown) {
      RequestProcessor.processError(error, res);
    }
  };
}
