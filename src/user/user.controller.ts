import { ServerResponse } from 'http';
import { STATUS_CODE } from '../constants/status.code';
import { BadRequestError, NotFoundError } from '../errors';
import { Request } from '../types';
import { User } from './user.interface';
import { UserService } from './user.service';
import { UserValidation } from './user.validation';

export class UserController {
  static getAllUsers = (res: ServerResponse) => {
    const users = UserService.getAllUsers();
    res.writeHead(STATUS_CODE.OK, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
  };

  static getUser = (req: Request, res: ServerResponse) => {
    const { id } = req.params;
    UserValidation.id(id);
    const user = UserService.getUser(id);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    res.writeHead(STATUS_CODE.OK, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(user));
  };

  static createUser = (req: Request, res: ServerResponse) => {
    if (req.headers['content-type'] !== 'application/json') {
      throw new BadRequestError('Content type is not JSON');
    }
    const userProperties: Omit<User, 'id'> = JSON.parse(req.body as string);
    UserValidation.body(userProperties);
    const user = UserService.createUser(userProperties);
    res.writeHead(STATUS_CODE.CREATED, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(user));
  };

  static updateUser = (req: Request, res: ServerResponse) => {
    const { id } = req.params;
    UserValidation.id(id);
    if (req.headers['content-type'] !== 'application/json') {
      throw new BadRequestError('Content type is not JSON');
    }
    const userProperties: Omit<User, 'id'> = JSON.parse(req.body as string);
    UserValidation.body(userProperties);
    const user = UserService.updateUser(id, userProperties);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    res.writeHead(STATUS_CODE.OK, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(user));
  };

  static deleteUser = (req: Request, res: ServerResponse) => {
    const { id } = req.params;
    UserValidation.id(id);
    const user = UserService.deleteUser(id);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    res.writeHead(STATUS_CODE.NO_CONTENT);
    res.end();
  };
}
