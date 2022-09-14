import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private readonly tasksRepository: Repository<Task>,
  ) {}

  // getAll(): Task[] {
  //   return this.tasks;
  // }

  // getTasksWithFilter(filterDTO: GetTasksFilterDTO): Task[] {
  //   const { search, status } = filterDTO;
  //   let tasks = this.getAll();

  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }

  //   if (search) {
  //     tasks = tasks.filter(
  //       (task) =>
  //         task.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
  //         task.description
  //           .toLocaleLowerCase()
  //           .includes(search.toLocaleLowerCase()),
  //     );
  //   }

  //   return tasks;
  // }

  // create(createTaskDTO: CreateTaskDTO): Task {
  //   const { title, description } = createTaskDTO;
  //   const task: Task = {
  //     id: nanoid(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };

  //   this.tasks.push(task);

  //   return task;
  // }

  async getTaskById(id: string): Promise<Task> {
    const task = await this.tasksRepository.findOne({ where: { id } });

    if (!task) {
      throw new NotFoundException(`Task with id: ${id}, not found.`);
    }

    return task;
  }

  // deleteTaskById(id: string): void {
  //   const taskFound = this.getTaskById(id);
  //   this.tasks = this.tasks.filter((task) => task.id === taskFound.id);
  // }

  // updateTaskStatus(id: string, status: TaskStatus): Task {
  //   const task = this.getTaskById(id);
  //   task.status = status;
  //   return task;
  // }
}
