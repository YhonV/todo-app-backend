import { Injectable } from '@nestjs/common';


export interface TasksInterface {
    id: number;
    title: string;
    description: string;
    done: boolean;
}

@Injectable()
export class TasksService {

    private tasks: TasksInterface[] = [];
    private idCounter = 1;

    findAll(): TasksInterface[]{
        return this.tasks;
    }

    findOne(id: number): TasksInterface{
        return this.tasks.find(task => task.id === id);
    }

    create(title: string): TasksInterface{
        const task: TasksInterface = {
            id: this.idCounter++,
            title,
            description: '',
            done: false,
        };
        this.tasks.push(task);
        return task;
    }

    update(id:number, title:string, description:string, done:boolean): TasksInterface{
        const task = this.findOne(id);
        if (task){
            task.title = title;
            task.description = description;
            task.done = done;
        }
        return task;
    }

    delete(id:number): void{
        this.tasks = this.tasks.filter(task => task.id !== id);
    }
}