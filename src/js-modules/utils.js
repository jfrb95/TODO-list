//This is a module for utility functions to be used 
//  in many other modules
// NOTE: WE DO NOT WANT utils.js AND utilities from index.js
//  TO BOTH EXIST - FIND A SOLUTION

//Make a function that creates, populates, and adds to the DOM a
//  list of tasks with the ability to add only a selection from 
//  the list. E.G only single projects or only group projects

//One way to do this - a second functional-programming/mixin style
// function that does the filter as an optional extra - could just 
// define a function to put in array.forEach() and do a mini-
// functional-programming-style thing with all that

export const utilsInit = function() {
    function addNewBasicDomElement(element, text, container) {
        const newElement = document.createElement(element);
        newElement.textContent = text;
        container.appendChild(newElement);
    }

    function addTaskToDomList(task, taskList) {
        
    }

    return {
        addNewBasicDomElement,
    }
}