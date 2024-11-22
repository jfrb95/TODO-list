import { utilsInit } from "./utils";

export const displayProjectPage = function(container, data, projectName, ...filterCallbacks) {
    const utils = utilsInit();
    
    utils.addElementWithTextToContainer("h1", projectName, container);

    utils.addNewTaskListToDom(data, container, utils.callback.taskInProjectFilter(projectName), ...filterCallbacks);
}