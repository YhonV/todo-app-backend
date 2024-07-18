import { Body, Controller, Delete, Get, Param, Post, Put, Logger } from '@nestjs/common';
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
    update(@Param('id') id: number,
           @Body('title') title: string,
           @Body('description') description: string,
           @Body('done') done: boolean): TasksInterface{
        this.logger.log('Actualizando tarea con id: ' + id);
        return this.taskService.update(id, title, description, done);
    }

    @Delete('id')
    delete(@Param('id') id:number): void{
        this.logger.log('Borrando tarea con id: ' + id);
        this.taskService.delete(id);
    }


}
