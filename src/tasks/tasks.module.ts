import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';

import { TasksController } from './tasks.controller';
import { taskProviders } from './tasks.provider';
import { TasksService } from './tasks.service';

@Module({
  imports: [DatabaseModule],
  controllers: [TasksController],
  providers: [...taskProviders, TasksService],
})
export class TasksModule {}
