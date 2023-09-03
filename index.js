class Todo{
    constructor(title, description, dueDate, priority){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = false;
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

    removeTodoItem(itemName){
        this.itemList = this.itemList.filter((todoItem) => todoItem.title !== itemName);
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

    toggleTodoItemCompletedStatus(title){
        this.itemList.forEach(function(todoItem){
            if (todoItem.title === title){
                if (todoItem.completed === false){
                    todoItem.completed = true;
                } else {
                    todoItem.completed = false;
                }
            }
        })
        
    }
    getTodoItemByTitle(title){
        
    }
}

// class Storage{
//     setTodoList(list){
//         localStorage.setItem("todoList", list);
//     }

//     addProject(projectName, projectObj){
//         const todoList = this.getTodoList();
//         todoList.
//     }

//     getTodoList(){
//         return localStorage.getItem("todoList");
//     }

//     addTodoItem(projectName, todo){
//         this.getTodoList().getProject(projectName).addTodoItem(todo);
//     }
// }

const todoList = new TodoList();
todoList.addProject("Home", new Project());

// DOM Stuff
const homeProjectTab = document.querySelector(".menu .home");

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

function deleteTodo(){
    const currentProject = dashboardProjectTitle.innerText;
    const todoRemoveBtns = Array.from(document.querySelectorAll(".removeItemBtn"));
    todoRemoveBtns.forEach(function(todoRemoveBtn){
        todoRemoveBtn.addEventListener("click", function(){
            const itemName = todoRemoveBtn.previousElementSibling.children[0].children[0].innerText;
            todoList.getProject(currentProject).removeTodoItem(itemName);
            displayTodos(currentProject);
        })
    })
}

function updateTodoCompletedStatus(){
    const currentProject = dashboardProjectTitle.innerText;
    const checkboxes = Array.from(document.querySelectorAll(".customCheckbox"));
    checkboxes.forEach(function(checkbox){
        checkbox.addEventListener("click", function(){
            const todoItemTitle = checkbox.nextElementSibling.children[0].children[0].innerText;
            todoList.getProject(currentProject).toggleTodoItemCompletedStatus(todoItemTitle);
            displayTodos(currentProject);
        })
    })
}

function displayTodos(projectName){
    todoDisplayArea.textContent = "";
    const currentProject = todoList.getProject(projectName);

    dashboardProjectTitle.textContent = projectName;
    currentProject.itemList.forEach(function(todoItem){
        todoDisplayArea.innerHTML += `
        <div class="todoItemTab" priority="${todoItem.priority}" completed="${todoItem.completed}">
            <div class="customCheckbox" checked=${todoItem.completed}></div>
            <details>
                <summary class="todoItemSummary">
                    <div class="todoItemTitle">${todoItem.title}</div>
                    <div class="todoItemDueDate">${todoItem.dueDate}</div>
                </summary>
                <div class="todoItemDescription">Description: ${todoItem.description}</div>
            </details>
            <div class="removeItemBtn">&#10799;</div>
        </div>`;
    });
    deleteTodo();
    updateTodoCompletedStatus();
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
        displayProjectNames();

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
            displayProjectNames();
            updateProjectNameinFormSelect();
        })
    })
}

function displayProjectNames(){
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
    displayProjectTodos();
}

function displayProjectTodos(){
    const projectTabNames = Array.from(document.querySelectorAll(".projectTab .projectTabName"));
    projectTabNames.forEach(function(projectTabName){
        projectTabName.addEventListener("click", function(){
            displayTodos(projectTabName.innerText);
        })
    })

    homeProjectTab.addEventListener("click", function(){
        displayTodos("Home");
    })
}

displayTodos("Home");
addNewTodo();
displayProjectNames();
addNewProject();