export const task = function(name,
    project,
    dateCreated,
    deadline,
    description,
    tags,
    priority) {
        return {
            get name() {
                return name;
            },
            get project() {
                return project;
            },
            get dateCreated() {
                return dateCreated;
            },
            get deadline() {
                return deadline;
            },
            get description() {
                return description;
            },
            get tags() {
                return tags;
            },
            get priority() {
                return priority;
            }
        }
}