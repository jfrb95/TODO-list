import { utilsInit } from "../utils";

export const thisMonthPage = function(container, data) {
    const utils = utilsInit();

    utils.addElementWithTextToContainer("h1", "This Month", container);

    utils.addElementWithTextToContainer("h2", "Projects", container);

    utils.addNewTaskListToDom(data, container, utils.callback.singleProjectFilter, utils.callback.taskDueThisMonth);

    utils.addElementWithTextToContainer("h2", "Group Projects", container);

    utils.addNewTaskListToDom(data, container, utils.callback.groupProjectFilter, utils.callback.taskDueThisMonth);
};