export class Project{
    constructor(){
        this.items = new Array();
    }

    addTodoItem(todoItem){
        this.items.push(todoItem);
    }

    removeTodoItem(itemName){
        this.items = this.items.filter((todoItem) => todoItem.title !== itemName);
    }

    todoItemNameExists(todoItemName){
        return this.getTodoItemNames().includes(todoItemName);
    }

    getTodoItemNames(){
        return this.items.map(todoItem => todoItem.title)
    }

    getTodoItems(){
        return this.items;
    }

    setTodoItems(items){
        this.items = items;
    }

    toggleTodoItemCompletedStatus(title){
        this.items.forEach(function(todoItem){
            if (todoItem.title === title){
                if (todoItem.completed === false){
                    todoItem.completed = true;
                } else {
                    todoItem.completed = false;
                }
            }
        })
        
    }
}