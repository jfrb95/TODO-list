import { utilsInit } from "../utils";

export const thisWeekPage = function(container, data) {
    const utils = utilsInit();

    utils.addElementWithTextToContainer("h1", "This Week", container);

    utils.addElementWithTextToContainer("h2", "Projects", container);

    utils.addNewTaskListToDom(data, container, utils.callback.singleProjectFilter, utils.callback.taskDueThisWeek);
}