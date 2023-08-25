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

    projectNameExists(projectName){
        return Object.keys(this.list).includes(projectName);
    }

    getProjectNames(){
        return Object.keys(this.list);
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

    todoItemNameExists(todoItemName){
        return this.getTodoItemNames().includes(todoItemName);
    }

    getTodoItemNames(){
        let todoItemNames = [];
        this.itemList.forEach(function(todoItem){
            todoItemNames.push(todoItem.title);
        })
        return todoItemNames;
    }
}

const todoList = new TodoList();
todoList.addProject("Home", new Project());

// DOM Stuff
const addTodoItemBtn = document.querySelector("#addTaskBtn");
const addProjectBtn = document.querySelector("#addProjectBtn");

const addTodoFormOverlay = document.querySelector(".addTaskFormOverlay");
const newTodoTaskForm = document.querySelector(".newTask");
const addProjectFormOverlay = document.querySelector(".addProjectOverlay")
const newProjectForm = document.querySelector(".newProject");

const todoDisplayArea = document.querySelector(".todoDisplay");
const projectsDisplayArea = document.querySelector(".projectDisplayArea");

const dashboardProjectTitle = document.querySelector(".dashboard .projectTitle");

function addTodoBtnHandler(){
    addTodoFormOverlay.classList.remove("inactive");
}

function submitNewTodoFormHandler(e){
    if (todoList.getProject(project.value).todoItemNameExists(title.value)){
        alert("Task Name already exists, choose another name");
    } else {
        todoList.getProject(project.value).addTodoItem(new Todo(title.value, description.value, dueDate.value, priority.value));
        addTodoFormOverlay.classList.add("inactive");
        displayTodos(project.value);
        console.log(todoList); 

        title.value = "";
        description.value = "";
        dueDate.value = "";
    }
    

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

function displayTodos(projectName){
    todoDisplayArea.textContent = "";
    const currentProject = todoList.getProject(projectName);

    dashboardProjectTitle.textContent = projectName;
    currentProject.itemList.forEach(function(todoTask){
        todoDisplayArea.innerHTML += `
        <div>
            <div class="todoTaskTitle">Title: ${todoTask.title}</div>
        </div>`;
    })
}

// Projects DOM
function addProjectBtnHandler(){
    addProjectFormOverlay.classList.remove("inactive");
}

function cancelProjectBtnHandler(){
    addProjectFormOverlay.classList.add("inactive");
}

function submitProjectBtnHandler(e){
    if (todoList.projectNameExists(projectName.value)){
        alert("Project Name already exists, choose a different name.")
    } else {
        todoList.addProject(projectName.value, new Project());
        updateProjectNameinFormSelect();
        addProjectFormOverlay.classList.add("inactive");
        displayProjects();
        deleteProject();

        console.log(todoList);
        projectName.value = "";
    
    }
    e.preventDefault();
}

function addNewProject(){
    addProjectBtn.addEventListener("click", () => addProjectBtnHandler());
    newProjectForm.addEventListener("submit", (e) => submitProjectBtnHandler(e));
    newProjectForm.addEventListener("reset", () => cancelProjectBtnHandler());
}

function updateProjectNameinFormSelect(){
    const projectNameSelection = newTodoTaskForm.querySelector("#project");
    projectNameSelection.textContent = "";
    todoList.getProjectNames().forEach(function(projectName){
        projectNameSelection.innerHTML += `
        <option value=${projectName}>${projectName}</option>
        `
    })
}

function deleteProject(){
    const removeProjectBtns = Array.from(document.querySelectorAll(".projectTab .closeButton"));

    removeProjectBtns.forEach(function(removeProjectBtn){
        removeProjectBtn.addEventListener("click", function(){
            todoList.removeProject(removeProjectBtn.previousElementSibling.innerText);
            displayProjects();
        })
    })
}

function displayProjects(){
    projectsDisplayArea.textContent = "";
    const projectNames = todoList.getProjectNames().slice(1);
    
    projectNames.forEach(function(projectName){
        projectsDisplayArea.innerHTML += `
        <div class="projectTab">
            <div class="projectTabName">${projectName}</div>
            <div class="closeButton">&#10799;</div>
        </div>`;
    });

    deleteProject();
}

displayTodos("Home");
addNewTodo();
displayProjects();
addNewProject();