//This is a module for utility functions to be used 
//  in many other modules

//need a function that checks the project.type AND checks if the 
// project.date is today. Is there a way of generalizing the 
// filter callback functions?

import { isToday } from "date-fns";
import { isThisWeek } from "date-fns";
import { isThisMonth } from "date-fns";
const log = console.log;

export const utilsInit = function() {
    function addElementWithTextToContainer(element, text, container) {
        const newElement = document.createElement(element);
        newElement.textContent = text;
        container.appendChild(newElement);
    }

    function addTaskToDomList(task, taskList) {
        const taskElement = document.createElement("li");
        taskElement.textContent = task.name;
        taskList.appendChild(taskElement);
    }

    function addNewTaskListToDom(data, container, ...filterFunctions) {
        const taskList = document.createElement("li");
        let filteredData = data.slice();
        
        for (const func of filterFunctions) {
            filteredData = filteredData.filter(func);
        }
        filteredData.forEach((task) => {
                addTaskToDomList(task, taskList);
            });
        container.appendChild(taskList);
    }


    //CALLBACKS

    function singleProjectFilter(task) {
        return task.project.type === "single";
    }

    function taskDueToday(task) {
        return isToday(task.deadline);
    }

    function groupProjectFilter(task) {
        return task.project.type === "group";
    }

    function taskDueThisWeek(task) {
        return isThisWeek(task.deadline);
    }

    function taskDueThisMonth(task) {
        return isThisMonth(task.deadline);
    }

    return {
        addElementWithTextToContainer,
        addTaskToDomList,
        addNewTaskListToDom,
        
        callback: {
            singleProjectFilter,
            groupProjectFilter,
            taskDueToday,
            taskDueThisWeek,
            taskDueThisMonth,
        }

    }
}