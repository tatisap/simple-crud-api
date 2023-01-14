import { db } from '../db';
import { User } from './user.interface';
import { v4 as uuidv4 } from 'uuid';

export class UserService {
  static getAllUsers = (): User[] => {
    return db;
  };

  static getUser = (id: string): User | null => {
    const user = db.find((item: User): boolean => item.id === id);
    if (!user) {
      return null;
    }
    return user;
  };

  static createUser = (userProperties: Omit<User, 'id'>): User => {
    const id = uuidv4();
    db.push({ id, ...userProperties });
    return { id, ...userProperties };
  };

  static updateUser = (id: string, updatedProperties: Partial<User>): User | null => {
    const userToUpdate = db.find((user: User): boolean => user.id === id);
    if (!userToUpdate) {
      return null;
    }
    const updatedUser = { ...userToUpdate, ...updatedProperties };
    const userIndex = db.findIndex((user: User): boolean => user.id === id);
    db.splice(userIndex, 1, updatedUser);
    return updatedUser;
  };

  static deleteUser = (id: string): boolean | null => {
    const userToDeleteIndex = db.findIndex((user: User): boolean => user.id === id);
    if (userToDeleteIndex === -1) {
      return null;
    }
    db.splice(userToDeleteIndex, 1);
    return true;
  };
}
