import { Todo } from './Todo';
import { Storage } from './Storage';

const storage = new Storage();

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
    if (storage.todoItemNameExists(project.value, title.value)){
        alert("Task Name already exists, choose another name");
    } else {
        storage.addTodoItem(project.value, new Todo(title.value, description.value, dueDate.value, priority.value));
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
    const projectName = dashboardProjectTitle.innerText;
    const todoRemoveBtns = Array.from(document.querySelectorAll(".removeItemBtn"));
    todoRemoveBtns.forEach(function(todoRemoveBtn){
        todoRemoveBtn.addEventListener("click", function(){
            const itemName = todoRemoveBtn.previousElementSibling.children[0].children[0].innerText;
            storage.removeTodoItem(projectName, itemName);
            displayTodos(projectName);
        })
    })
}

function updateTodoCompletedStatus(){
    const projectName = dashboardProjectTitle.innerText;
    const checkboxes = Array.from(document.querySelectorAll(".customCheckbox"));
    checkboxes.forEach(function(checkbox){
        checkbox.addEventListener("click", function(){
            const todoItemTitle = checkbox.nextElementSibling.children[0].children[0].innerText;
            storage.toggleTodoItemCompletedStatus(projectName, todoItemTitle);
            displayTodos(projectName);
        })
    })
}

function displayTodos(projectName){
    todoDisplayArea.textContent = "";

    dashboardProjectTitle.textContent = projectName;
    storage.getTodoItems(projectName).forEach(function(todoItem){
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
    if (storage.projectNameExists(projectName.value)){
        alert("Project Name already exists, choose a different name.")
    } else {
        storage.addProject(projectName.value);
        addProjectFormOverlay.classList.add("inactive");
        displayProjectNames();

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
    storage.getProjectNames().forEach(function(projectName){
        projectNameSelection.innerHTML += `
        <option value=${projectName}>${projectName}</option>
        `
    })
}

function deleteProject(){
    const removeProjectBtns = Array.from(document.querySelectorAll(".projectTab .closeButton"));

    removeProjectBtns.forEach(function(removeProjectBtn){
        removeProjectBtn.addEventListener("click", function(){
            if (document.querySelector(".dashboard .projectTitle").innerText === removeProjectBtn.previousElementSibling.innerText){
                displayTodos("Home");
            }
            storage.removeProject(removeProjectBtn.previousElementSibling.innerText);
            displayProjectNames();
            updateProjectNameinFormSelect();
        })
    })
}

function displayProjectNames(){
    projectsDisplayArea.textContent = "";
    const projectNames = storage.getProjectNames().slice(1);
    
    projectNames.forEach(function(projectName){
        projectsDisplayArea.innerHTML += `
        <div class="projectTab">
            <div class="projectTabName">
                ${projectName}
            </div>
            <div class="closeButton">&#10799;</div>
        </div>`;
    });

    deleteProject();
    displayProjectTodos();
    updateProjectNameinFormSelect();
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