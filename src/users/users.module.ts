import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, WaitList } from './entities';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, WaitList])],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
