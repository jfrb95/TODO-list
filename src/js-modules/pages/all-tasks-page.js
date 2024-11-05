import {utilsInit} from "../utils.js";

export const allTasksPage = function(container, data) {
    const log = console.log;
    const utils = utilsInit();
    
    utils.addElementWithTextToContainer("h1", "All Tasks", container);

    utils.addElementWithTextToContainer("h2", "Projects", container);

    utils.addNewTaskListToDom(data, container, utils.callback.singleProjectFilter);

    utils.addElementWithTextToContainer("h2", "Group Projects", container);

    utils.addNewTaskListToDom(data, container, utils.callback.groupProjectFilter);
}