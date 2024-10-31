//This is a module for utility functions to be used 
//  in many other modules
// NOTE: WE DO NOT WANT utils.js AND utilities from index.js
//  TO BOTH EXIST - FIND A SOLUTION

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

    return {
        addElementWithTextToContainer,
        addTaskToDomList,
    }
}