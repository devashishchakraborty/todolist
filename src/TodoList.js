import { Project } from './Project';

export class TodoList{
    constructor(){
        this.projects = {};
        this.projects["Home"] = new Project();
    }

    addProject(projectName, project){
        this.projects[projectName] = project;
    }

    removeProject(projectName){
        delete this.projects[projectName];
    }

    getProject(projectName){
        return this.projects[projectName];
    }

    getProjects(){
        return this.projects;
    }

    setProject(projectName, projectObj){
        this.projects[projectName] = projectObj;
    }

    projectNameExists(projectName){
        return Object.keys(this.projects).includes(projectName);
    }

    getProjectNames(){
        return Object.keys(this.projects);
    }
}