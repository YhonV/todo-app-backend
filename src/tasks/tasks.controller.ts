import { Body, Controller, Delete, Get, Param, Post, Put, Logger, BadRequestException, NotFoundException } from '@nestjs/common';
import { TasksService, TasksInterface } from './tasks.service';
@Controller('tasks')
export class TasksController {

    logger = new Logger(TasksController.name);
    constructor(private taskService: TasksService) {}

    @Get()
    findAll(): TasksInterface[]{
        this.logger.log('Buscando todas las tareas');
        return this.taskService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number): TasksInterface{
        this.logger.log('Buscando tarea con id: ' + id);
        return this.taskService.findOne(id);
    }

    @Post()
    create(@Body('title') title: string): TasksInterface{
        this.logger.log('Creando tarea con titulo: ' + title);
        return this.taskService.create(title);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body('title') title: string, @Body('done') done: boolean): TasksInterface {
        
        const taskId = parseInt(id.toString(), 10);
        if (isNaN(taskId)) {
            throw new BadRequestException('ID inválido');
        }
        
        const task = this.taskService.findOne(taskId);
        if (!task) {
            throw new NotFoundException('No se encontró la tarea con id: ' + taskId);
        }
    
        this.logger.log('Actualizando tarea con id: ' + taskId);
        const updatedTask = this.taskService.update(taskId, title, done);
        return updatedTask;
    }

    @Delete(':id')
    delete(@Param('id') id: string): void {
    const taskId = parseInt(id, 10);
    if (isNaN(taskId)) {
        throw new BadRequestException('ID inválido');
    }
    
    const task = this.taskService.findOne(taskId);
    if (!task) {
        throw new NotFoundException('No se encontró la tarea con id: ' + taskId);
    }
    
    this.logger.log('Eliminando tarea con id: ' + taskId);
    this.taskService.delete(taskId);
}


}
