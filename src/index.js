import "./style.css";
import { displayContentPage } from "./js-modules/displayContentPage.js";
import { displayProjectPage } from "./js-modules/displayProjectPage.js";

import { startOfTomorrow } from "date-fns";

import { utilsInit } from "./js-modules/utils.js";

const log = console.log;

const GLOBAL = (function() {
    const utils = utilsInit();
    const dataPath = "./data.json";

    const container = document.querySelector(".container");
    const navigationBar = document.querySelector(".navigation");
    const contentPanel = document.querySelector(".content");
    const domProjectsList = document.querySelector(".projects-list");
    const domGroupProjectsList = document.querySelector(".group-projects-list");
    const navButtons = document.querySelector(".nav-buttons");
    navButtons.addEventListener("click", (event) => {
        const classes = event.target.classList;
        if (!classes.contains("nav-button")) {
            return;
        }
        utils.loadNewContentPage(classes[0], contentPanel, data);
    });
    const navProjectsSection = document.querySelector(".nav-projects-section");
    
    //WORKING ON THIS
    navProjectsSection.addEventListener("click", (event) => {
        if (!event.target.classList.contains("project")) {
           return
        }
        utils.loadNewProjectPage(event.target.dataset.projectName, contentPanel, data);
    })

    /*NEW PROJECT DIALOG*/
    const newProjectDialog = document.querySelector("dialog.new-project");
    const newProjectButton = document.querySelector(".new-project-button");
    const dialogCancelNewProjectButton = document.querySelector(".new-project .dialog-cancel");
    const newProjectForm = document.querySelector(".new-project form");
    const dialogCreateProjectButton = document.querySelector(".dialog-create-project");
    newProjectButton.addEventListener("click", (event) => {
        newProjectDialog.showModal();
    });
    dialogCreateProjectButton.addEventListener("click", (event) => {
        event.preventDefault();
        const fd = new FormData(newProjectForm);
        if (Object.keys(projectList).includes(fd.get("project-name"))) {
            alert("That name is already in use");
        } else {
            addProjectToList(
                Project(
                    fd.get("project-name"),
                    fd.get("type"),
                    fd.get("description"),
                    false
                )
            );
            updateNavProjectLists();
            newProjectDialog.close();
        }
    });
    dialogCancelNewProjectButton.addEventListener("click", (event) => {
        event.preventDefault();
        newProjectDialog.close();
    });

    /*NEW TASK DIALOG*/
    const newTaskDialog = document.querySelector("dialog.new-task");
    const newTaskButton = document.querySelector(".new-task-button");
    const dialogCancelNewTaskButton = document.querySelector(".new-task .dialog-cancel")
    const newTaskForm = document.querySelector(".new-task form");
    const dialogCreateTaskButton = document.querySelector(".dialog-create-task");
    const newTaskProjectDropdown = document.querySelector("select#project");
    newTaskButton.addEventListener("click", (event) => {
        clearElement(newTaskProjectDropdown);
        for (const project of Object.keys(projectList)) {
            const option = document.createElement("option");
            option.textContent = project;
            option.value = project;
            newTaskProjectDropdown.appendChild(option);
        }
        newTaskDialog.showModal();
    });
    dialogCreateTaskButton.addEventListener("click", (event) => {
        event.preventDefault();
        let uniqueName = true;
        const fd = new FormData(newTaskForm);
        for (const task of data) {
            if (task.name === fd.get("task-name")) {
                uniqueName = false;
            }
        }
        if (uniqueName) {
            addTaskToData(
                Task(
                    fd.get("task-name"),
                    projectList[fd.get("project")],
                    new Date(),
                    new Date(fd.get("deadline")),
                    fd.get("description"),
                    [],
                    fd.get("priority")
                ), 
                data
            );
            switch (contentPanel.dataset.pageType){
                case "nav-button":
                    utils.loadNewContentPage(contentPanel.dataset.currentPage, contentPanel, data);
                    break;
                case "project":
                    utils.loadNewProjectPage(contentPanel.dataset.currentPage, contentPanel, data);
                    break;
                default:
                    return new Error("Current Page is not project or nav button");
            
            }
            
            newTaskDialog.close();
        } else {
            alert("That name is already in use");
        };
    });
    dialogCancelNewTaskButton.addEventListener("click", (event) => {
        event.preventDefault();
        newTaskDialog.close();
    });

    //DELETE TASK EVENT LISTENING
    /*
    const domTaskList = document.querySelector(".task-list");
    domTaskList.addEventListener("click", (event) => {
        log(event.target);
        if (event.target.closest("delete")) {
            deleteTask(event.target.closest("task").dataset.taskIndex);
            //Need to refrash the page here
            switch (contentPanel.dataset.pageType){
                case "nav-button":
                    loadNewContentPage(contentPanel.dataset.currentPage);
                    break;
                case "project":
                    loadNewProjectPage(contentPanel.dataset.currentPage);
                    break;
                default:
                    return new Error("Current Page is not project or nav button");
            
            }
        }
    })
        */

    function Task(name, project, dateCreated, deadline, description, tags, priority) {

        let index;

        return {
            name,
            project,
            dateCreated,
            deadline,
            description,
            tags,
            priority,
            set index(i) {
                index = i;
            },
            get index() {
                return index;
            }
        }
    }
    function Project(name, type, description, completed=false) {
        return {
            name,
            type,
            description,
            completed,
        }
    }

    function readData(path) {
        return [
        ];
    }
    function addTaskToData(task, data) {
        task.index = data.length;
        data.push(task);
    }
    function toggleCompleted(task) {
        task.completed = (task.completed ? false : true);
    }
    function clearElement(element) {
        element.replaceChildren();
    }

    function getProjectList(path) {
        return projectList;
    }
    function projectsOfTypeFromList(type, projectList) {
        let projects = [];
        for (const project of Object.keys(projectList)) {
            if (projectList[project].type === type) {
                projects.push(projectList[project]);
            }
        }
        return projects;
    }
    function addListOfProjectsToTarget(listOfProjects, target) {
        listOfProjects.forEach((project) => {
            const li = document.createElement("li");
            utils.createProjectVisualAndAddToElement(project.name, li);
            target.appendChild(li);
        })
    }
    function updateNavProjectLists() {
        clearElement(domProjectsList);
        clearElement(domGroupProjectsList);
        
        const listOfSingleProjects = projectsOfTypeFromList("single", getProjectList("path goes here"))
        addListOfProjectsToTarget(listOfSingleProjects, domProjectsList);
        
        const listOfGroupProjects = projectsOfTypeFromList("group", getProjectList("path goes here"))
        addListOfProjectsToTarget(listOfGroupProjects, domGroupProjectsList);
    

    }
    function addProjectToList(project) {
        projectList[project.name] = project;
    }


    let projectList = {
        project1:   {
                        name: "project1",
                        type: "single",
                        completed: false,
                    },

        project2:   {
                        name: "project2",
                        type: "group",
                        completed: false,
                    },

        project3:   {
                        name: "project3",
                        type: "single",
                        completed: true,
                    },
    };

    const data = readData(dataPath);
    updateNavProjectLists();

    addTaskToData(Task("task1", projectList.project1, "date1", new Date(2025, 1, 1), "user-created description of task1", ["wedding", "funny"], 1), data);
    addTaskToData(Task("task2", projectList.project2, "date6", new Date(), "description for task 2", ["dog", "american"], 5), data);
    addTaskToData(Task("task3", projectList.project1, "date5", startOfTomorrow(), "description for task3", ["tag6", "tag1"], 3), data);
    addTaskToData(Task("task4", projectList.project1, "date6", new Date(), "description for task 4", ["tag1"], 2), data);

    displayContentPage(contentPanel, data, "All Tasks");

    document.querySelector("body").addEventListener("click", (event) => {
        log(data);
    });

    //TO DO:
    //add proper data storage
    //make delete and edit functional


    //ISSUES:
    //addTaskToData() gives the task the index - currently this wont
    //  be updated as the data updates. Fix this.
    //  Current state of deleteTask() may solve this issue.
    //  The delete task system is untested - need to add eventlistener

    //Completed toggle is barebones
    //Delete task is hacky
    
    //WHAT I WOULD DO NEXT TIME:
    //have a 'component' class or factory etc. that contains
    //  state info and a reference to the DOM version of itself
    //Then a page could be made purely in javascript, and a function
    //  could load a page purely by reading the list of components
    //  and generating the html using functions that are stored as
    //  properties within the component object


})();