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
    function Project(name, type) {
        return {
            name,
            type,
            completed: false,
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
    function clearContent() {
        contentPanel.innerHTML = "";
    }
    function loadNewPage(str) {
        switch (str) {
            case "all":
                clearContent();
                displayContentPage(contentPanel, data, "All Tasks");
                break;
            case "today": 
                clearContent();
                displayContentPage(contentPanel, data, "Today's Tasks", utils.callback.taskDueToday);
                break;
            case "week":
                clearContent();
                displayContentPage(contentPanel, data, "This Week", utils.callback.taskDueThisWeek);
                break;
            case "month":
                clearContent();
                displayContentPage(contentPanel, data, "This Month", utils.callback.taskDueThisMonth);
                break;
        }
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
            li.textContent = project.name;
            target.appendChild(li);
        })
    }
    function updateNavProjectLists() {
        addListOfProjectsToTarget(projectsOfTypeFromList("single", getProjectList("path goes here")), domProjectsList);
        addListOfProjectsToTarget(projectsOfTypeFromList("group", getProjectList("path goes here")), domGroupProjectsList);
    }
    function addProjectToList(project) {
        projectList = {
            ...projectList,
            project
        }
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

    //LAST TIME: Generalised the content page creation functions
})();