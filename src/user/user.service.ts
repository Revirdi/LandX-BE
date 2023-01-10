import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { User, userModels } from './user.entity';
import { MikroORM, wrap } from '@mikro-orm/core';
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
    const orm = await this.orm.em.getRepository<User>(userModels);
    const results = orm.findAll();
    return results;
  }
  async updateUser(body: bodyDTO) {
    const { id, username, email } = body;
    // const orm = await this.orm.em.getRepository<User>(userModels);
    // const data = await orm.findOne(id);
    // wrap(data).assign(
    //   {
    //     username,
    //     email,
    //   },
    //   { updateByPrimaryKey: false },
    // );
    // await this.orm.em.persistAndFlush(data);
    const res1 = await this.em
      .qb(User)
      .update({ username, email })
      .where({ id });

    // const qb = await this.em.createQueryBuilder(User);
    // qb.update({
    //   username,
    //   email,
    // }).where({
    //   id,
    // });
    console.log(res1);
  }
}
