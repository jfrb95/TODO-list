import { isToday } from "date-fns";
import { utilsInit } from "../utils";
const log = console.log;

export const todayTasksPage = function(container, data) {
    const utils = utilsInit();

    log(data);

    utils.addElementWithTextToContainer("h1", "Today's Tasks", container);

    utils.addElementWithTextToContainer("h2", "Projects", container);

    const projectTasksList = document.createElement("ul");
    data.filter((task) => {
            return task.project.type === "single" && 
                   isToday(task.deadline)
                
        })
        .forEach((task) => {
            utils.addTaskToDomList(task, projectTasksList)
        });
    container.appendChild(projectTasksList);

    utils.addElementWithTextToContainer("h2", "Group Projects", container);

    const groupProjectTasksList = document.createElement("ul");
    data.filter((task) => {
            return task.project.type === "group" && 
                   isToday(task.deadline)
            
        })
        .forEach((task) => {
            utils.addTaskToDomList(task, groupProjectTasksList);
        })
    container.appendChild(groupProjectTasksList);
}