import {utilsInit} from "../utils.js";

export const allTasksPage = function(container, data, projectsList) {
    const log = console.log;
    const utils = utilsInit();
    
    utils.addElementWithTextToContainer("h1", "All Tasks", container);

    utils.addElementWithTextToContainer("h2", "Projects", container);

    const projectTasksList = document.createElement("ul");
    data.filter((task) => task.project.type === "single").forEach((task) => {
        utils.addTaskToDomList(task, projectTasksList);
    })
    container.appendChild(projectTasksList);

    utils.addElementWithTextToContainer("h2", "Group Projects", container);

    const groupProjectTasksList = document.createElement("ul");
    data.filter((task) => task.project.type === "group").forEach ((task) => {
        utils.addTaskToDomList(task, groupProjectTasksList);
    })
    container.appendChild(groupProjectTasksList);
}