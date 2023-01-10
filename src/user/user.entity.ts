import { Entity, EntitySchema, Property } from '@mikro-orm/core';

export class BaseAttribute {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export const base = {
  id: { type: 'number', primary: true },
  createdAt: { type: 'Date', onCreate: () => new Date() },
  updatedAt: {
    type: 'Date',
    onCreate: () => new Date(),
    onUpdate: () => new Date(),
  },
};

export class User extends BaseAttribute {
  username: string;
  email: string;
  isDelete: boolean;
}

export const userModels = new EntitySchema<User>({
  name: 'User',
  tableName: 'users',
  properties: {
    ...base,
    username: { type: 'string', unique: true, nullable: false, length: 225 },
    email: { type: 'string', unique: true, nullable: false, length: 225 },
    isDelete: {
      type: 'boolean',
      unique: false,
      nullable: false,
      default: false,
    },
  },
});
