'use strict'

class Task{
    constructor(task, owner, isDone) {
        this.task = task;
        this.owner = owner;
        this.isDone = isDone;
    }

}
const parseTask = function (data) {
    if (!data) return;
    const { task, owner, isDone } = data;
    const newTask = new Task(task, owner, isDone);
    return newTask;
}