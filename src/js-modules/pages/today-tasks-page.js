import { isToday } from "date-fns";
import { utilsInit } from "../utils";

export const todayTasksPage = function(container, date) {
    //want a function that takes a date and determines if that date is today
    const utils = utilsInit();

    utils.addElementWithTextToContainer("h1", "Today's Tasks", container);
}