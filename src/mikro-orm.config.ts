import { MikroORM } from '@mikro-orm/core';
import { TSMigrationGenerator } from '@mikro-orm/migrations';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';

export default {
  type: 'postgresql',
  host: '127.0.0.1',
  port: 5432,
  user: 'postgres',
  password: 'dwi123',
  dbName: 'landxtest',
  getLogger: async function (message: string) {
    console.log(message);
  },
  getDriver: PostgreSqlDriver,
  entities: ['./dist/user/user.entity.js'],
  entitiesTs: ['./src/user/user.entity.ts'],
  migration: {
    path: __dirname + '/migrations',
    glob: '!(*.d).{js,ts}',
    transactional: true,
    disableForeignKeys: true,
    allOrNothing: true,
    dropTables: true,
    safe: false,
    snapshot: true,
    emit: 'ts',
    generator: TSMigrationGenerator,
  },
  discovery: {
    warnWhenNoEntities: true,
    requireEntitiesArray: false,
    alwaysAnalyseProperties: true,
  },
  metadataProvider: TsMorphMetadataProvider,
} as Parameters<typeof MikroORM.init>[0];
