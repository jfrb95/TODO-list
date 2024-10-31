import "./style.css";
import {allTasksPage} from "./js-modules/pages/all-tasks-page.js";

const log = console.log;

const GLOBAL = (function() {
    const dataPath = "./data.json";

    const container = document.querySelector(".container");
    const navigationBar = document.querySelector(".navigation");
    const contentPanel = document.querySelector(".content");

    const utilities = function() {
        function readData(path) {
            return [
                {
                    name: "task1",
                    project: "project1",
                    dateCreated: "date1",
                    deadline: "date2",
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
                    project: "project1",
                    dateCreated: "date3",
                    deadline: "date4",
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

        return {
            readData,
            writeNewTask,
            addTaskToData,
            toggleCompleted,
        }
    }();

    const projectsList = [
        {
            name: "project1",
            type: "single",
            completed: false,
        },
        {
            name: "project2",
            type: "group"
        },
        {
            name: "project3",
            type: "single",
            completed: true,
        }
    ];
    
    const data = utilities.readData(dataPath);

    allTasksPage(contentPanel, data);

})();