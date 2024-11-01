//This is a module for utility functions to be used 
//  in many other modules
// NOTE: WE DO NOT WANT utils.js AND utilities from index.js
//  TO BOTH EXIST - FIND A SOLUTION


//make function to create ,populate, and add to the dom a list of tasks

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

    function addNewTaskListToDom(data, filterFunction=(task)=>{}, container) {
        const taskList = document.createElement("li");
        data.filter(filterFunction)
            .forEach((task) => {
                addTaskToDomList(task, taskList);
            })
        container.appendChild(taskList);
    }

    function singleProjectFilterCallback(task) {
        return task.project.type === "single";
    }

    function groupProjectFilterCallback(task) {
        return task.project.type === "group";
    }

    return {
        addElementWithTextToContainer,
        addTaskToDomList,
        addNewTaskListToDom,
        singleProjectFilterCallback,
        groupProjectFilterCallback,
        
    }
}