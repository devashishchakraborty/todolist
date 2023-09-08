import { Project } from './Project';
import { TodoList } from './TodoList';


export class Storage{
    setTodoList(data){
        localStorage.setItem("todoList", JSON.stringify(data));
    }

    addProject(projectName){
        const todoList = this.getTodoList();
        todoList.addProject(projectName, new Project());
        this.setTodoList(todoList);
    }

    projectNameExists(projectName){
        const todoList = this.getTodoList();
        return todoList.projectNameExists(projectName);
    }

    removeProject(projectName){
        const todoList = this.getTodoList();
        todoList.removeProject(projectName);
        this.setTodoList(todoList);
    }

    getProjectNames(){
        return this.getTodoList().getProjectNames()
    }

    getTodoList(){
        const todoList = Object.assign(new TodoList(), JSON.parse(localStorage.getItem("todoList")));
        
        for(let project in todoList.getProjects()){
            todoList.setProject(project, Object.assign(new Project(), todoList.getProject(project)));
        }

        return todoList;
    }

    addTodoItem(projectName, todoItem){
        const todoList = this.getTodoList();
        todoList.getProject(projectName).addTodoItem(todoItem);
        this.setTodoList(todoList);
    }

    removeTodoItem(projectName, todoItemName){
        const todoList = this.getTodoList();
        todoList.getProject(projectName).removeTodoItem(todoItemName);
        this.setTodoList(todoList);
    }

    getTodoItems(projectName){
        return this.getTodoList().getProject(projectName).getTodoItems();
    }

    todoItemNameExists(projectName, todoItemName){
        return this.getTodoList().getProject(projectName).todoItemNameExists(todoItemName);
    }

    toggleTodoItemCompletedStatus(projectName, todoItem){
        const todoList = this.getTodoList();
        todoList.getProject(projectName).toggleTodoItemCompletedStatus(todoItem);
        this.setTodoList(todoList);
    }
    
}
