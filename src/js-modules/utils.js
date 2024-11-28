//This is a module for utility functions to be used 
//  in many other modules

//Is there a way of generalizing the 
// filter callback functions?

import { isToday } from "date-fns";
import { isThisWeek } from "date-fns";
import { isThisMonth } from "date-fns";
import deleteSvg from "../img/delete.svg";
import editSvg from "../img/edit.svg";
import { displayContentPage } from "./displayContentPage.js";
import { displayProjectPage } from "./displayProjectPage.js";
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
        createTaskVisualAndAddToElement(task, taskElement);
        taskList.appendChild(taskElement);
    }

    function addNewTaskListToDom(data, container, ...filterFunctions) {
        //this is not yet  working
        const taskList = document.createElement("ul");
        taskList.classList.add("task-list");
        taskList.addEventListener("click", (event) => {
            const deleteButton = event.target.closest("button");
            if (deleteButton && deleteButton.classList.contains("delete")) {
                deleteTask(event.target.closest(".task-wrapper").dataset.taskIndex, data);
                log(container.dataset);
                //loadNewContentPage is not in utils.js
                switch (container.dataset.pageType){
                    case "nav-button":
                        loadNewContentPage(container.dataset.currentPage, container, data);
                        break;
                    case "project":
                        loadNewProjectPage(container.dataset.currentPage, container, data);
                        break;
                    default:
                        return new Error("Current Page is not project or nav button");
                
                }
            }
            log(data);
        })

        function deleteTask(task, data) {
            data = data.slice(task.index, 1)
            log(data);
            refreshTaskIndexes(data);
            
        }
        function refreshTaskIndexes(data) {
            for (let i = 0; i < data.length; ++i) {
                data[i].index = i;
            }
        }


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

    function loadNewContentPage(str, container, data) {
        switch (str) {
            case "all":
                clearElement(container);
                displayContentPage(container, data, "All Tasks");
                break;
            case "today": 
                clearElement(container);
                displayContentPage(container, data, "Today's Tasks", taskDueToday);
                break;
            case "week":
                clearElement(container);
                displayContentPage(container, data, "This Week", taskDueThisWeek);
                break;
            case "month":
                clearElement(container);
                displayContentPage(container, data, "This Month", taskDueThisMonth);
                break;
            default:
                return new Error("loadNewContentPage input was an incorrect type");
        }
        container.dataset.currentPage = str;
        container.dataset.pageType = "nav-button";
    }
    function loadNewProjectPage(projectName, container, data) {
        clearElement(container);
        displayProjectPage(container, data, projectName);
        container.dataset.currentPage = projectName;
        container.dataset.pageType = "project";
    }

    function clearElement(element) {
        element.replaceChildren();
    }


    //Task visual builder functions
    function buildVisualTask(task) {
        
        const taskHTML = `
            <div class="task-wrapper" data-task-index="${task.index}">
                <div class="task">
                    <p>${task.name}</p>
                    <ul class="task-controls">
                        <li>
                            <button class="icon-button edit">
                                ${editSvg}
                            </button>
                        </li>
                        <li>
                            <button class="icon-button delete">
                                ${deleteSvg}
                            </button>
                        </li>
                        <li class="checkbox">
                            <input type="checkbox" name="completed"/>
                        </li>
                    </ul>
                </div>
                <div class="task-description-wrapper hidden">
                    <div class="task-description">
                        <p>${task.description}</p>
                        <p>Priority: ${task.priority}</p>
                    </div>
                </div>
            </div>
        `;

        const taskFragment = document.createRange()
                                .createContextualFragment(taskHTML);
    
        taskFragment.querySelector("button.edit svg")
            .classList.add(...["small-icon", "edit"]);
        taskFragment.querySelector("button.delete svg")
            .classList.add(...["small-icon", "delete"]);
        
        
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
    function createTaskVisualAndAddToElement(task, element) {
        element.appendChild(buildVisualTask(task));
        element.querySelector(".task-wrapper").addEventListener("click", (event) => {
            if (!event.target.closest(".task-controls") && event.target.closest(".task")) {
                const descriptionClassList = event.currentTarget.querySelector(".task-description-wrapper").classList;

                if (descriptionClassList.contains("hidden")) {
                    descriptionClassList.remove("hidden");
                } else {
                    descriptionClassList.add("hidden");
                }
            }
        });
        
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
        loadNewContentPage,
        loadNewProjectPage,
        
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