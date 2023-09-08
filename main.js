(()=>{"use strict";class e{constructor(e,t,o,s){this.title=e,this.description=t,this.dueDate=o,this.priority=s,this.completed=!1}}class t{constructor(){this.items=new Array}addTodoItem(e){this.items.push(e)}removeTodoItem(e){this.items=this.items.filter((t=>t.title!==e))}todoItemNameExists(e){return this.getTodoItemNames().includes(e)}getTodoItemNames(){return this.items.map((e=>e.title))}getTodoItems(){return this.items}setTodoItems(e){this.items=e}toggleTodoItemCompletedStatus(e){this.items.forEach((function(t){t.title===e&&(!1===t.completed?t.completed=!0:t.completed=!1)}))}}class o{constructor(){this.projects={},this.projects.Home=new t}addProject(e,t){this.projects[e]=t}removeProject(e){delete this.projects[e]}getProject(e){return this.projects[e]}getProjects(){return this.projects}setProject(e,t){this.projects[e]=t}projectNameExists(e){return Object.keys(this.projects).includes(e)}getProjectNames(){return Object.keys(this.projects)}}const s=new class{setTodoList(e){localStorage.setItem("todoList",JSON.stringify(e))}addProject(e){const o=this.getTodoList();o.addProject(e,new t),this.setTodoList(o)}projectNameExists(e){return this.getTodoList().projectNameExists(e)}removeProject(e){const t=this.getTodoList();t.removeProject(e),this.setTodoList(t)}getProjectNames(){return this.getTodoList().getProjectNames()}getTodoList(){const e=Object.assign(new o,JSON.parse(localStorage.getItem("todoList")));for(let o in e.getProjects())e.setProject(o,Object.assign(new t,e.getProject(o)));return e}addTodoItem(e,t){const o=this.getTodoList();o.getProject(e).addTodoItem(t),this.setTodoList(o)}removeTodoItem(e,t){const o=this.getTodoList();o.getProject(e).removeTodoItem(t),this.setTodoList(o)}getTodoItems(e){return this.getTodoList().getProject(e).getTodoItems()}todoItemNameExists(e,t){return this.getTodoList().getProject(e).todoItemNameExists(t)}toggleTodoItemCompletedStatus(e,t){const o=this.getTodoList();o.getProject(e).toggleTodoItemCompletedStatus(t),this.setTodoList(o)}},i=document.querySelector(".menu .home"),r=document.querySelector("#addTaskBtn"),c=document.querySelector("#addProjectBtn"),n=document.querySelector(".addTaskFormOverlay"),d=document.querySelector(".newTask"),a=document.querySelector(".addProjectOverlay"),l=document.querySelector(".newProject"),m=document.querySelector(".todoDisplay"),u=document.querySelector(".projectDisplayArea"),v=document.querySelector(".dashboard .projectTitle");function p(e){m.textContent="",v.textContent=e,s.getTodoItems(e).forEach((function(e){m.innerHTML+=`\n        <div class="todoItemTab" priority="${e.priority}" completed="${e.completed}">\n            <div class="customCheckbox" checked=${e.completed}></div>\n            <details>\n                <summary class="todoItemSummary">\n                    <div class="todoItemTitle">${e.title}</div>\n                    <div class="todoItemDueDate">${e.dueDate}</div>\n                </summary>\n                <div class="todoItemDescription">Description: ${e.description}</div>\n            </details>\n            <div class="removeItemBtn">&#10799;</div>\n        </div>`})),function(){const e=v.innerText;Array.from(document.querySelectorAll(".removeItemBtn")).forEach((function(t){t.addEventListener("click",(function(){const o=t.previousElementSibling.children[0].children[0].innerText;s.removeTodoItem(e,o),p(e)}))}))}(),function(){const e=v.innerText;Array.from(document.querySelectorAll(".customCheckbox")).forEach((function(t){t.addEventListener("click",(function(){const o=t.nextElementSibling.children[0].children[0].innerText;s.toggleTodoItemCompletedStatus(e,o),p(e)}))}))}()}function j(){const e=d.querySelector("#project");e.textContent="",s.getProjectNames().forEach((function(t){e.innerHTML+=`\n        <option value=${t}>${t}</option>\n        `}))}function h(){u.textContent="",s.getProjectNames().slice(1).forEach((function(e){u.innerHTML+=`\n        <div class="projectTab">\n            <div class="projectTabName">${e}</div>\n            <div class="closeButton">&#10799;</div>\n        </div>`})),Array.from(document.querySelectorAll(".projectTab .closeButton")).forEach((function(e){e.addEventListener("click",(function(){document.querySelector(".dashboard .projectTitle").innerText===e.previousElementSibling.innerText&&p("Home"),s.removeProject(e.previousElementSibling.innerText),h(),j()}))})),Array.from(document.querySelectorAll(".projectTab .projectTabName")).forEach((function(e){e.addEventListener("click",(function(){p(e.innerText)}))})),i.addEventListener("click",(function(){p("Home")})),j()}p("Home"),r.addEventListener("click",(function(){n.classList.remove("inactive")})),d.addEventListener("submit",(t=>function(t){s.todoItemNameExists(project.value,title.value)?alert("Task Name already exists, choose another name"):(s.addTodoItem(project.value,new e(title.value,description.value,dueDate.value,priority.value)),n.classList.add("inactive"),p(project.value),title.value="",description.value="",dueDate.value=""),t.preventDefault()}(t))),d.addEventListener("reset",(function(){n.classList.add("inactive")})),h(),c.addEventListener("click",(()=>{a.classList.remove("inactive")})),l.addEventListener("submit",(e=>function(e){s.projectNameExists(projectName.value)?alert("Project Name already exists, choose a different name."):(s.addProject(projectName.value),a.classList.add("inactive"),h(),projectName.value=""),e.preventDefault()}(e))),l.addEventListener("reset",(()=>{a.classList.add("inactive")}))})();