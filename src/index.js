import "./style.css";

const log = console.log;

const GLOBAL = (function() {
    const dataPath = "./data.json";

    const container = document.querySelector(".container");
    const navigationBar = document.querySelector(".navigation");
    const contentPanel = document.querySelector(".content");

    const utilities = function() {
        function readData(path) {
            return require(`${path}`);
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

        return {
            readData,
            writeNewTask,
            addTaskToData
        }
    }();

    const data = [
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
            priority: 1
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
            priority: 5
        }
    ];



    utilities.writeNewTask("task3", "project2", "date5", "date6", "description of task3", ["tag1", "tag2"], 3);

    log(data);

})();