import {utilsInit} from "../utils.js";

export const allTasksPage = function(container, data, projectsList) {
    const log = console.log;
    const utils = utilsInit();
    
    utils.addNewBasicDomElement("h1", "All Tasks", container);

    const allTasksList = document.createElement("ul");
    data.forEach((task) => {
        const taskListElement = document.createElement("li");
        taskListElement.textContent = task.name;
        allTasksList.appendChild(taskListElement);
    })
    container.appendChild(allTasksList);

    utils.addNewBasicDomElement("h2", "Projects", container);

    const projectTasksList = document.createElement("ul");
    data.filter((task) => task.project.type === "single").forEach((task) => {
        const taskListElement = document.createElement("li");
        taskListElement.textContent = task.name;
        projectTasksList.appendChild(taskListElement);
    })
    container.appendChild(projectTasksList);

    utils.addNewBasicDomElement("h2", "Group Projects", container);

    const groupProjectTasksList = document.createElement("ul");
    data.filter((task) => task.project.type === "group").forEach ((task) => {
        const groupTaskListElement = document.createElement("li");
        groupTaskListElement.textContent = task.name;
        groupProjectTasksList.appendChild(groupTaskListElement);
    })
    container.appendChild(groupProjectTasksList);
}