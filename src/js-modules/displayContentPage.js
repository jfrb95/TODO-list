import { utilsInit } from "./utils";

export const displayContentPage = function(container, data, header, ...filterCallbacks) {
    const utils = utilsInit();
    
    utils.addElementWithTextToContainer("h1", header, container);

    utils.addElementWithTextToContainer("h2", "Projects", container);

    utils.addNewTaskListToDom(data, container, utils.callback.singleProjectFilter, ...filterCallbacks);

    utils.addElementWithTextToContainer("h2", "Group Projects", container);

    utils.addNewTaskListToDom(data, container, utils.callback.groupProjectFilter, ...filterCallbacks);
}