import { validate as uuidValidate } from 'uuid';
import { BadRequestError } from '../errors';
import { UserProperties } from './user.interface';

export class UserValidation {
  static id = (id: string): void => {
    if (!uuidValidate(id)) {
      throw new BadRequestError('User id is invalid (not uuid)');
    }
  };

  static body = (body: UserProperties): void => {
    console.log(body);
    const { username, age, hobbies } = body;
    if ([username, age, hobbies].filter((key) => key === undefined).length) {
      throw new BadRequestError('Required information was not send ');
    }
    if (typeof username !== 'string') {
      throw new BadRequestError('Username had to be a string');
    }
    if (typeof age !== 'number' && Number.isInteger(age)) {
      throw new BadRequestError('Age had to be an integer');
    }
    if (!(Array.isArray(hobbies) && hobbies.every((hobby) => typeof hobby === 'string'))) {
      throw new BadRequestError('Hobbies had to be a string array');
    }
  };
}
