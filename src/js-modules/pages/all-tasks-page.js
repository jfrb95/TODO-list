export const allTasksPage = function(container, data) {
    const header = document.createElement("h1");
    header.textContent = "All Tasks";
    container.appendChild(header);

    const allTasksList = document.createElement("ul");
    for (const task of data) {
        const taskListElement = document.createElement("li");
        taskListElement.textContent = task.name;
        allTasksList.appendChild(taskListElement);
    }
    container.appendChild(allTasksList);

    const projectsHeader = document.createElement("h2");
    projectsHeader.textContent = "Projects";
    container.appendChild(projectsHeader);

    const groupProjectsHeader = document.createElement("h2");
    groupProjectsHeader.textContent = "Group Projects";
    container.appendChild(groupProjectsHeader);
}