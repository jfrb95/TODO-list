import { utilsInit } from "../utils";
const log = console.log;

export const todayTasksPage = function(container, data) {
    const utils = utilsInit();

    utils.addElementWithTextToContainer("h1", "Today's Tasks", container);

    utils.addElementWithTextToContainer("h2", "Projects", container);
    
    utils.addNewTaskListToDom(data, container, utils.callback.singleProjectFilter, utils.callback.taskDueToday);

    utils.addElementWithTextToContainer("h2", "Group Projects", container);

    utils.addNewTaskListToDom(data, container, utils.callback.groupProjectFilter, utils.callback.taskDueToday)
}