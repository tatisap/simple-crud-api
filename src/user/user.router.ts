import { ServerResponse } from 'http';
import { HTTP_METHOD } from '../constants/http.method';
import { Request } from '../types';
import { UserController } from './user.controller';

export const UserRouter = (req: Request, res: ServerResponse): boolean => {
  const { path, splitedPath, method } = req;
  const ENDPOINT = 'api/users';
  if (!path.startsWith(ENDPOINT) || splitedPath.includes('')) {
    return false;
  }
  switch (method) {
    case HTTP_METHOD.GET: {
      if (path === ENDPOINT) {
        UserController.getAllUsers(res);
        return true;
      }
      if (splitedPath.length === 3) {
        req.params = { id: splitedPath[2] };
        UserController.getUser(req, res);
        return true;
      }
      return false;
    }
    case HTTP_METHOD.POST: {
      if (path === ENDPOINT) {
        UserController.createUser(req, res);
        return true;
      }
      return false;
    }
    case HTTP_METHOD.PUT: {
      if (splitedPath.length === 3) {
        req.params = { id: splitedPath[2] };
        UserController.updateUser(req, res);
        return true;
      }
      return false;
    }
    case HTTP_METHOD.DELETE: {
      if (splitedPath.length === 3) {
        req.params = { id: splitedPath[2] };
        UserController.deleteUser(req, res);
        return true;
      }
      return false;
    }
    default:
      return false;
  }
};
