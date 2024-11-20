import "./style.css";
import { displayContentPage } from "./js-modules/displayContentPage.js";

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
        loadNewPage(classes[0]);
    });

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
            loadNewPage(contentPanel.dataset.currentPage);
            newTaskDialog.close();
        } else {
            alert("That name is already in use");
        };
    });
    dialogCancelNewTaskButton.addEventListener("click", (event) => {
        event.preventDefault();
        newTaskDialog.close();
    });

    function Task(name, project, dateCreated, deadline, description, tags, priority) {

        return {
            name,
            project,
            dateCreated,
            deadline,
            description,
            tags,
            priority
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
            {
                name: "task1",
                project: projectList.project1,
                dateCreated: "date1",
                deadline: new Date(2025, 1, 1),
                description: "user-created description of task1",
                tags: [
                    "wedding",
                    "funny"
                ],
                priority: 1,
                completed: false
            },
    
            {
                name: "task2",
                project: projectList.project2,
                dateCreated: "date3",
                deadline: new Date(),
                description: "user-created description of task2",
                tags: [
                    "dog",
                    "american"
                ],
                priority: 5,
                completed: true
            }
        ];
    }
    function addTaskToData(task, data) {
        data.push(task);
    }
    function toggleCompleted(task) {
        task.completed = (task.completed ? false : true);
    }
    function clearElement(element) {
        element.replaceChildren();
    }
    function loadNewPage(str) {
        switch (str) {
            case "all":
                clearElement(contentPanel);
                displayContentPage(contentPanel, data, "All Tasks");
                break;
            case "today": 
                clearElement(contentPanel);
                displayContentPage(contentPanel, data, "Today's Tasks", utils.callback.taskDueToday);
                break;
            case "week":
                clearElement(contentPanel);
                displayContentPage(contentPanel, data, "This Week", utils.callback.taskDueThisWeek);
                break;
            case "month":
                clearElement(contentPanel);
                displayContentPage(contentPanel, data, "This Month", utils.callback.taskDueThisMonth);
                break;
        }
        contentPanel.dataset.currentPage = str;
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
        addListOfProjectsToTarget(projectsOfTypeFromList("single", getProjectList("path goes here")), domProjectsList);
        addListOfProjectsToTarget(projectsOfTypeFromList("group", getProjectList("path goes here")), domGroupProjectsList);
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

    addTaskToData(Task("task3", projectList.project1, "date5", startOfTomorrow(), "description for task3", ["tag6", "tag1"], 3), data);
    addTaskToData(Task("task4", projectList.project1, "date6", new Date(), "description for task 4", ["tag1"], 2), data);

    displayContentPage(contentPanel, data, "All Tasks");

    //TO DO: Get project and task displays to have more functionality
    //  not just the name.



    //ISSUES:
    //svg icons take a second to load in - looks sloppy
    //  -possible to wait for icons to load before displaying?
})();