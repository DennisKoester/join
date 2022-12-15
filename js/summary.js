function initSummary() {
    getNumberTasksAll();
    getNumberTasksTodo();
    getNumberTasksInProgress();
    getNumberTasksFeedback();
    getNumberTasksDone();
    getTasksUrgent();
}


function getNumberTasksAll() {
    const tasksAll = document.getElementById('count-tasks-all');
    let allTasks = 0;

    for (let i = 0; i < tasks.length; i++) {
        allTasks += tasks[i].length;
    }

    tasksAll.innerHTML = allTasks;
}

function getNumberTasksTodo() {
    const todoCount = document.getElementById('count-todo');
    const tasksTodo = tasks[0].length;

    todoCount.innerHTML = tasksTodo;
}

function getNumberTasksInProgress() {
    const inProgressCount = document.getElementById('count-in-progress');
    const tasksInProgress = tasks[1].length;

    inProgressCount.innerHTML = tasksInProgress;
}

function getNumberTasksFeedback() {
    const feedbackCount = document.getElementById('count-feedback');
    const tasksFeedback = tasks[2].length;

    feedbackCount.innerHTML = tasksFeedback;
}

function getNumberTasksDone() {
    const doneCount = document.getElementById('count-done');
    const tasksDone = tasks[3].length;

    doneCount.innerHTML = tasksDone;
}

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

function displayUrgentDate(countUrgent) {
    const urgentDate = document.getElementById('urgent-date');

    if (countUrgent.length == 0) {
        urgentDate.classList.add('d-none');
    }
    else {
        urgentDate.innerHTML = getUrgentDateNearest(countUrgent);
    }
}

function getUrgentDateNearest(countUrgent) {
    if (countUrgent.length > 1) {
        let dates = [];
        
        for (let i = 0; i < countUrgent.length; i++) {
        dates.push(countUrgent[i].date);
        }

        dates.sort();
        return parseDate(dates[0]);
    }
    else {
        return parseDate(countUrgent[0]);
    }
}

function parseDate(date) {
    const dateAsArray = date.split('-');
    const day = dateAsArray[2];
    const month = months[parseInt(dateAsArray[1])];
    const year = dateAsArray[0];

    return `${month} ${day}, ${year}`;
}

function setUrgentLabel(countUrgent) {
    const urgentLabel = document.getElementById('urgent-label');

    if (countUrgent == 0) {
        urgentLabel.innerHTML = 'No Upcoming Deadline';
    }
}