import "./style.css";
import { allTasksPage } from "./js-modules/pages/all-tasks-page.js";
import { todayTasksPage } from "./js-modules/pages/today-tasks-page.js";

const log = console.log;

const GLOBAL = (function() {
    const dataPath = "./data.json";

    const container = document.querySelector(".container");
    const navigationBar = document.querySelector(".navigation");
    const contentPanel = document.querySelector(".content");

    function readData(path) {
        return [
            {
                name: "task1",
                project: projectsList.project1,
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
                project: projectsList.project2,
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
    function writeNewTask(name, project, dateCreated, deadline, description, tags, priority) {

        const newTask = {
            name,
            project,
            dateCreated,
            deadline,
            description,
            tags,
            priority
        }

        addTaskToData(newTask, data);
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

    const projectsList = {
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

    writeNewTask("task3", projectsList.project1, "date5", new Date(), "description for task3", ["tag6", "tag1"], 3)

    //allTasksPage(contentPanel, data);
    todayTasksPage(contentPanel, data);
})();