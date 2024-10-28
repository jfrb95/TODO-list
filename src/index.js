import "./style.css";

const log = console.log;

const GLOBAL = (function() {
    const container = document.querySelector(".container");
    const navigationBar = document.querySelector(".navigation");
    const contentPanel = document.querySelector(".content");

    const utilities = function() {
        function readData(path) {
            return require(`${path}`);
        }

        return {
            readData,
        }
    }();

    const data = utilities.readData("./data.json");
    
    function writeNewTask(name, project, dateCreated, deadline, description, tags, priority) {
        
    }

})();