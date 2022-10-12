import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { DatabaseModule } from './database/database.module';
import { taskProviders } from './tasks/tasks.provider';

@Module({
  imports: [TasksModule, DatabaseModule],
  controllers: [],
  providers: [...taskProviders],
})
export class AppModule {}
