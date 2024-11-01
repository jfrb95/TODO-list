import {utilsInit} from "../utils.js";

export const allTasksPage = function(container, data, projectsList) {
    const log = console.log;
    const utils = utilsInit();
    
    utils.addElementWithTextToContainer("h1", "All Tasks", container);

    utils.addElementWithTextToContainer("h2", "Projects", container);

    utils.addNewTaskListToDom(data, utils.singleProjectFilterCallback, container);

    utils.addElementWithTextToContainer("h2", "Group Projects", container);

    utils.addNewTaskListToDom(data, utils.groupProjectFilterCallback, container);
}