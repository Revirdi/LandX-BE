import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { User, userModels } from './user.entity';
import { MikroORM } from '@mikro-orm/core';
import { bodyDTO } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly orm: MikroORM,
    private readonly em: EntityManager,
  ) {}
  async addUser(body: bodyDTO) {
    const orm = await this.orm.em.getRepository<User>(userModels);
    const create = orm.create({ ...body });
    await this.orm.em.persistAndFlush(create);
    return create;
  }
  async getAllUser() {
    const res = await this.em.qb(User).select('*').where({ isDelete: false });
    return res;
  }
  async updateUser(body: bodyDTO) {
    const { id, username, email } = body;

    const res1 = await this.em
      .qb(User)
      .update({ username, email })
      .where({ id });

    return res1.affectedRows > 0;
  }

  async deleteUser(id: number) {
    const res = await this.em.qb(User).update({ isDelete: true }).where({ id });
    return res.affectedRows > 0;
  }
}
