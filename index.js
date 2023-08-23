class Todo{
    constructor(title, description, dueDate, priority){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }
}

class TodoList{
    constructor(){

    }
}

class Project{
    constructor(name){
        this.name = name;
        this.list = [];
    }

    addTodoItem(todoItem){
        this.list.push(todoItem);
    }
}