import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
  imports: [MikroOrmModule.forRoot(), UserModule],
})
export class AppModule {}
