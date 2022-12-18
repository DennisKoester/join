/**
 * Initialises the summary
 */
function initSummary() {
    getNumberTasksAll();
    getNumberTasksTodo();
    getNumberTasksInProgress();
    getNumberTasksFeedback();
    getNumberTasksDone();
    getTasksUrgent();
}


/**
 * Calculates the number of all tasks and displays it
 */
function getNumberTasksAll() {
    const tasksAll = document.getElementById('count-tasks-all');
    let allTasks = 0;

    for (let i = 0; i < tasks.length; i++) {
        allTasks += tasks[i].length;
    }

    tasksAll.innerHTML = allTasks;
}


/**
 * Calculates the number of the tasks in status "to do" and displays it
 */
function getNumberTasksTodo() {
    const todoCount = document.getElementById('count-todo');
    const tasksTodo = tasks[0].length;

    todoCount.innerHTML = tasksTodo;
}


/**
 * Calculates the number of the tasks in status "in progress" and displays it
 */
function getNumberTasksInProgress() {
    const inProgressCount = document.getElementById('count-in-progress');
    const tasksInProgress = tasks[1].length;

    inProgressCount.innerHTML = tasksInProgress;
}


/**
 * Calculates the number of the tasks in status "awaiting feedback" and displays it
 */
function getNumberTasksFeedback() {
    const feedbackCount = document.getElementById('count-feedback');
    const tasksFeedback = tasks[2].length;

    feedbackCount.innerHTML = tasksFeedback;
}


/**
 * Calculates the number of the tasks in status "done" and displays it
 */
function getNumberTasksDone() {
    const doneCount = document.getElementById('count-done');
    const tasksDone = tasks[3].length;

    doneCount.innerHTML = tasksDone;
}


/**
 * Calculates the number of the tasks with prio "urgent" and displays the respective data
 */
function getTasksUrgent() {
    const countUrgent = getNumberTasksUrgent();
    displayUrgentDate(countUrgent);
    setUrgentLabel(countUrgent.length);
}


/**
 * Filters all urgent tasks that are still in progress
 * @returns Array of urgent tasks
 */
function getNumberTasksUrgent() {
    const urgentCount = document.getElementById('count-urgent');
    let counter = [];

    for (let i = 0; i < tasks.length - 1; i++) {
        counter = counter.concat((tasks[i].filter(item => item['prio'] == 2)));
    }

    urgentCount.innerHTML = counter.length;
    return counter;
}


/**
 * Displays the date of the task with prio "urgent" that is due earliest
 * @param {Array} countUrgent List of tasks with prio "urgent"
 */
function displayUrgentDate(countUrgent) {
    const urgentDate = document.getElementById('urgent-date');

    if (countUrgent.length == 0) {
        urgentDate.classList.add('d-none');
    }
    else {
        urgentDate.innerHTML = getUrgentDateNearest(countUrgent);
    }
}


/**
 * Calculates the earliest due date of tasks with prio "urgent"
 * @param {Array} countUrgent List of tasks with prio "urgent"
 * @returns The earliest due date of tasks with prio "urgent"
 */
function getUrgentDateNearest(countUrgent) {
    if (countUrgent.length > 1) {
        let dates = [];
        
        for (let i = 0; i < countUrgent.length; i++) {
        dates.push(countUrgent[i].date);
        }

        dates.sort();
        return formatDate(dates[0]);
    }
    else {
        return formatDate(countUrgent[0]);
    }
}


/**
 * Formats the given date as "MMM DD, YYYY" (e. g. October 23, 2022)
 * @param {String} date
 * @returns The date as string in the required format
 */
function formatDate(date) {
    // const dateAsArray = date.split('-');
    // const day = dateAsArray[2];
    // const month = months[parseInt(dateAsArray[1])];
    // const year = dateAsArray[0];

    // return `${month} ${day}, ${year}`;

    const dateAsString = new Date(date + 'T00:00:00.000');

    return dateAsString.toLocaleDateString('en-GB', {year: 'numeric', month: 'long', day: 'numeric'});
}


/**
 * Sets the label of the "Urgent" badge depending on the number of tasks with prio "urgent"
 * @param {Array} countUrgent A list of tasks with prio "urgent"
 */
function setUrgentLabel(countUrgent) {
    const urgentLabel = document.getElementById('urgent-label');

    if (countUrgent == 0) {
        urgentLabel.innerHTML = 'No Upcoming Deadline';
    }
}