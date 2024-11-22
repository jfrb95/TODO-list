//This is a module for utility functions to be used 
//  in many other modules

//Is there a way of generalizing the 
// filter callback functions?

import { isToday } from "date-fns";
import { isThisWeek } from "date-fns";
import { isThisMonth } from "date-fns";
import deleteSvg from "../img/delete.svg";
import editSvg from "../img/edit.svg";
const log = console.log;

export const utilsInit = function() {

    const svgs = {
        edit: editSvg,
        delete: deleteSvg,
    };

    function addElementWithTextToContainer(element, text, container) {
        const newElement = document.createElement(element);
        newElement.textContent = text;
        container.appendChild(newElement);
    }

    function addTaskToTaskList(task, taskList) {
        const taskElement = document.createElement("li");
        createTaskVisualAndAddToElement(task.name, taskElement);
        taskList.appendChild(taskElement);
    }

    function addNewTaskListToDom(data, container, ...filterFunctions) {
        const taskList = document.createElement("ul");
        let filteredData = data.slice();
        
        for (const func of filterFunctions) {
            filteredData = filteredData.filter(func);
        }
        filteredData.forEach((task) => {
                addTaskToTaskList(task, taskList);
            }
        );
        container.appendChild(taskList);
    }

    //Task visual builder functions
    function buildVisualTask(name) {
        
        const taskHTML = `
            <div class="task">
                <p>${name}</p>
                <ul class="task-controls">
                    <li><button class="icon-button edit">
                        ${editSvg}
                    </button></li>
                    <li><button class="icon-button delete">
                        ${deleteSvg}
                    </button></li>
                </ul>
            </div>
        `;

        const taskFragment = document.createRange()
                                .createContextualFragment(taskHTML);
    
        taskFragment.querySelector("button.edit svg")
            .classList.add(...["small-icon", "edit"]);
        taskFragment.querySelector("button.delete svg")
            .classList.add(...["small-icon", "delete"]);
        //addSmallIconToElement("edit", taskFragment.querySelector("button.edit"));
        //addSmallIconToElement("delete", taskFragment.querySelector("button.delete"));

        //What if in the future we wanted to 
        // add more svgs? Is there a way/design pattern that makes it
        // so that adding more such things is easy?
        // For example, a centralised list of "things", in this case 
        // "edit" and "delete", so that merely adding to this list 
        // will update all the necessary things elsewhere. Also, is
        // there a way to generalise this to make it abstract enough
        // to use with many other things?

        return taskFragment;
    }
    function createTaskVisualAndAddToElement(taskName, element) {
        element.appendChild(buildVisualTask(taskName));
    }

    //Project visual builder functions
    function buildVisualProject(name) {
        const projectHTML = `
            <button class="project" data-project-name="${name}">
                <p>${name}</p>
            </button>
        `;

        const projectFragment = document.createRange()
                                    .createContextualFragment(projectHTML);
        
        return projectFragment;
    }
    function createProjectVisualAndAddToElement(projectName, element) {
        element.appendChild(buildVisualProject(projectName));
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

    function taskInProjectFilter(projectName) {
        return function(task) {
            return task.project.name === projectName;
        }
    }

    return {
        addElementWithTextToContainer,
        addTaskToTaskList,
        addNewTaskListToDom,
        createTaskVisualAndAddToElement,
        createProjectVisualAndAddToElement,
        
        callback: {
            singleProjectFilter,
            groupProjectFilter,
            taskDueToday,
            taskDueThisWeek,
            taskDueThisMonth,
            taskInProjectFilter,
        }

    }
}