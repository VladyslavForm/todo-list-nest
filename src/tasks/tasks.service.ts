import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dtos/create-task.dto';
import { Task } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.sevice';
import { UpdateTaskDto } from './dtos/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private readonly prismaService: PrismaService) {}

  async getTasks() {
    return await this.prismaService.task.findMany();
  }
  async createTask(dto: CreateTaskDto): Promise<Task> {
    const task = await this.prismaService.task.create({
      data: dto,
    });
    return task;
  }

  async updateTask(id: number, dto: UpdateTaskDto): Promise<Task> {
    await this.getTaskOrThrow(id);
    const updatedTask = await this.prismaService.task.update({
      where: { id },
      data: dto,
    });
    return updatedTask;
  }

  async deleteTask(id: number) {
    await this.getTaskOrThrow(id);
    return this.prismaService.task.delete({ where: { id } });
  }

  private async getTaskOrThrow(id: number) {
    const task = this.prismaService.task.findUnique({ where: { id } });

    if (!task) {
      throw new NotFoundException('Could not find any tasks');
    }

    return task;
  }
}
