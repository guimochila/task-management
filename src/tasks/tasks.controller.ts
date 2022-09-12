import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDTO } from './dto/update-task-status.dto';
import { Task } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get('/')
  getTasks(@Query() filterDTO: GetTasksFilterDTO): Task[] {
    // If no filters defined return all tasks
    if (Object.keys(filterDTO).length) {
      return this.tasksService.getTasksWithFilter(filterDTO);
    } else {
      return this.tasksService.getAll();
    }
  }

  @Post('/')
  create(@Body() createTaskDTO: CreateTaskDTO): Task {
    return this.tasksService.create(createTaskDTO);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): void {
    return this.tasksService.deleteTaskById(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDTP: UpdateTaskStatusDTO,
  ): Task {
    const { status } = updateTaskStatusDTP;
    return this.tasksService.updateTaskStatus(id, status);
  }
}
