export const allTasksPage = function(container, data, projectsList) {
    const log = console.log;
    
    const header = document.createElement("h1");
    header.textContent = "All Tasks";
    container.appendChild(header);

    const allTasksList = document.createElement("ul");
    data.forEach((task) => {
        const taskListElement = document.createElement("li");
        taskListElement.textContent = task.name;
        allTasksList.appendChild(taskListElement);
    })
    container.appendChild(allTasksList);

    const projectsHeader = document.createElement("h2");
    projectsHeader.textContent = "Projects";
    container.appendChild(projectsHeader);

    const projectTasksList = document.createElement("ul");
    data.filter((task) => task.project.type === "single").forEach((task) => {
        const taskListElement = document.createElement("li");
        taskListElement.textContent = task.name;
        projectTasksList.appendChild(taskListElement);
    })
    container.appendChild(projectTasksList);

    const groupProjectsHeader = document.createElement("h2");
    groupProjectsHeader.textContent = "Group Projects";
    container.appendChild(groupProjectsHeader);

    const groupProjectTasksList = document.createElement("ul");
    data.filter((task) => task.project.type === "group").forEach ((task) => {
        const groupTaskListElement = document.createElement("li");
        groupTaskListElement.textContent = task.name;
        groupProjectTasksList.appendChild(groupTaskListElement);
    })
    container.appendChild(groupProjectTasksList);
}