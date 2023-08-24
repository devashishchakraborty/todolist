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
        this.list = {}
    }

    addProject(projectName, project){
        this.list[projectName] = project;
    }

    removeProject(projectName){
        delete this.list[projectName];
    }

    getProject(projectName){
        return this.list[projectName];
    }
}

class Project{
    constructor(){
        this.itemList = [];
    }

    addTodoItem(todoItem){
        this.itemList.push(todoItem);
    }

    removeTodoItem(itemIndex){
        this.itemList.splice(itemIndex);
    }
}

const todoList = new TodoList();
todoList.addProject("Home", new Project());

// DOM Stuff
const addTodoItemBtn = document.querySelector("#addTaskBtn");
const addProjectBtn = document.querySelector("#addProjectBtn");

const addTodoFormOverlay = document.querySelector(".addTaskFormOverlay");
const newTodoTaskForm = document.querySelector(".newTask");
const newProjectForm = document.querySelector(".newProject");

const todoDisplayArea = document.querySelector(".todoDisplay");
const projectsDisplayArea = document.querySelector(".projectDisplayArea");


function addTodoBtnHandler(){
    addTodoFormOverlay.classList.remove("inactive");
}

function submitNewTodoFormHandler(e){
    todoList.getProject(project.value).addTodoItem(new Todo(title.value, description.value, dueDate.value, priority.value));
    addTodoFormOverlay.classList.add("inactive");
    displayTodos(todoList.getProject(project.value));
    console.log(todoList); 

    title.value = "";
    description.value = "";
    dueDate.value = "";

    e.preventDefault();
}

function addTodoFormCloseBtnHandler(){
    addTodoFormOverlay.classList.add("inactive");
}

function addNewTodo(){
    addTodoItemBtn.addEventListener("click", addTodoBtnHandler);
    newTodoTaskForm.addEventListener("submit", e => submitNewTodoFormHandler(e));
    newTodoTaskForm.addEventListener("reset", addTodoFormCloseBtnHandler);
}

function displayTodos(project){
    todoDisplayArea.textContent = "";
    project.itemList.forEach(function(todoTask){
        const todoItemDiv = document.createElement("div");
        todoItemDiv.innerHTML = ` <div>Title: ${todoTask.title}</div>`;
        todoDisplayArea.appendChild(todoItemDiv);   
    })
}

// Projects DOM
function addProjectBtnHandler(){
    newProjectForm.classList.remove("inactive");
}

function cancelProjectBtnHandler(){
    newProjectForm.classList.add("inactive");
}

function submitProjectBtnHandler(e){
    todoList.addProject(projectName.value, new Project());
    newProjectForm.classList.add("inactive");
    displayProjects();
    console.log(todoList); 
    projectName.value = "";

    e.preventDefault();
}

function addNewProject(){
    addProjectBtn.addEventListener("click", addProjectBtnHandler);
    newProjectForm.addEventListener("submit", e => submitProjectBtnHandler(e));
    newProjectForm.addEventListener("reset", cancelProjectBtnHandler);
}

function displayProjects(){
    projectsDisplayArea.textContent = "";
    const projectNames = Object.keys(todoList.list);
    
    projectNames.forEach(function(projectName){
        const projectTab = document.createElement("div");
        projectTab.classList.add("projectTab");
        projectTab.innerHTML = `<div class="projectTabName">${projectName}</div><div></div>`;
        projectsDisplayArea.appendChild(projectTab);
    })
}

displayTodos(todoList.getProject("Home"));
addNewTodo();
displayProjects();
addNewProject();