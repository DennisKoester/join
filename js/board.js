/**
 * Time for fading a modal in and out
 */
const MODAL_FADE_TIME = 350;
/**
 * The currently opened task
 */
let openedTask = { statusId: -1, taskId: -1 };
/**
 * Information about the used device
 */
let isTouchDevice = false;
/**
 * The click position on a touch device
 */
let clickPos = { x: 0, y: 0 };
/**
 * List of tasks filtered by the search function
 */
let searchResult = [[], [], [], []];


/**
 * Initiates the board
 */
async function initBoard() {
    await init();

    renderTasks();

    // Check for touch device
    try {
        document.createEvent('TouchEvent');
        isTouchDevice = true;
    }
    catch { /* no change necessary */ }
}


/**
 * Renders all tasks to the board
 */
function renderTasks() {
    for (let i = 0; i < tasks.length; i++) {
        renderTasksStatus(i);
    }
}


/**
 * Renders all tasks of the respective status
 * @param {Number} statusId The ID of the respective status
 */
function renderTasksStatus(statusId) {
    const statusContainer = document.getElementById(`tasks-status-${statusId}`);
    statusContainer.innerHTML = '';
    if (tasks[statusId].length == 0) {
        showMsgNoTask(statusId, true);
    }
    else {
        showMsgNoTask(statusId, false);
        for (let t = 0; t < tasks[statusId].length; t++) {
            renderSingleTaskCard(statusId, t, statusContainer);
        }
    }
}


/**
 * Renders a single task card to its respective status container
 * @param {Number} statusId The status ID
 * @param {Number} taskId The task's ID within the status
 * @param {Object} container The status container
 */
function renderSingleTaskCard(statusId, taskId, container) {
    const cat = getCategory(statusId, taskId);
    const catColor = getCategoryColor(cat);
    const prio = getPriority(statusId, taskId);
    container.innerHTML += renderTaskCard(statusId, taskId, cat, catColor, prio);
}


/**
 * Toggles the visibility of the "No Task" message of the respective status
 * @param {number} statusId The ID of the respective status
 */
function showMsgNoTask(statusId, isVisible) {
    const msg = document.getElementById(`no-task-status-${statusId}`);
    if (isVisible) {
        msg.classList.remove('d-none');
    }
    else {
        msg.classList.add('d-none');
    }
}


/**
 * Evaluates the category of the task
 * @param {Number} statusId The status ID
 * @param {Number} taskId The task's ID within the status
 * @returns Category as String
 */
function getCategory(statusId, taskId) {
    return tasks[statusId][taskId]['cat'];
}


/**
 * Evaluates the color of the task's category 
 * @param {String} category The category of the task
 * @returns Color as String
 */
function getCategoryColor(category) {
    const id = categories.findIndex(item => item['name'] == category);
    return categories[id]['color'];
}


/**
 * Initiates the rendering of the progress information
 * @param {Number} statusId The ID of the status
 * @param {Number} taskId The task's ID within the status
 * @returns HTML
 */
function getSubtasksProgress(statusId, taskId) {
    if (tasks[statusId][taskId]['subtasks'].length == 0) return '';

    return renderSubtasksProgress(statusId, taskId);
}


/**
 * Evaluates the number of subtasks done
 * @param {Number} statusId The ID of the status
 * @param {Number} taskId The task's ID within the status
 * @returns Array with subtasks done
 */
function getSubtasksDone(statusId, taskId) {
    return tasks[statusId][taskId]['subtasks'].filter(item => item['status']).length;
}


/**
 * Evaluates the percentage of subtasks done
 * @param {Number} statusId The ID of the status
 * @param {Number} taskId The task's ID within the status
 * @returns Percentual value of subtasks done
 */
function getSubtasksDoneInPerc(statusId, taskId) {
    const subtasksDone = getSubtasksDone(statusId, taskId);
    const subtasksCount = tasks[statusId][taskId]['subtasks'].length;

    return (subtasksDone / subtasksCount) * 100;
}


/**
 * Evluates the list of assignees depending wheter there are more than 3 assignees or not
 * @param {Number} statusId The ID of the status
 * @param {Number} taskId The task's ID within the status
 * @returns HTML
 */
function getAssignees(statusId, taskId) {
    const assigneesCount = tasks[statusId][taskId]['assignees'].length;
    const assigneesDisplayMax = assigneesCount > 3 ? 2 : assigneesCount;
    let assigneesList = '';

    for (let a = 0; a < assigneesDisplayMax; a++) {
        assigneesList += createAssigneeBadge(statusId, taskId, a);
    }

    if (assigneesCount > 3) {
        const diff = assigneesCount - assigneesDisplayMax;
        assigneesList += renderAssigneesMore(diff);
    }

    return assigneesList;
}


/**
 * Renders the badges of the assignees to the viewer
 * @param {Number} statusId The ID of the status
 * @param {Number} taskId The task's ID within the status
 * @param {Number} assigneeId The ID of the assignee
 * @returns HMTL
 */
function createAssigneeBadge(statusId, taskId, assigneeId) {
    const mail = tasks[statusId][taskId]['assignees'][assigneeId];
    const id = users.findIndex(user => user['email'] == mail);
    const color = users[id]['color'];
    const short = users[id]['short_name'];

    return renderAssigneesList(color, short);
}


/**
 * Evaluates the priority of the task
 * @param {Number} statusId The ID of the status
 * @param {Number} taskId The task's ID within the status
 * @returns Priority as String
 */
function getPriority(statusId, taskId) {
    return tasks[statusId][taskId]['prio'];
}


/**
 * Toggles the visibility of a modal
 * @param {String} id The ID of the modal
 */
function toggleModal(id) {
    const modal = document.getElementById(id);

    if (id == 'modal-task') {
        controlTaskViewer(modal);
    }

    if (id == 'modal-add-task') {
        controlAddTaskModal(modal);
    }
}


/**
 * Controls the display of the task viewer and editor
 * @param {Object} modal The modal window to be handled
 */
function controlTaskViewer(modal) {
    controlReaderVisibility();
    if (!modal.classList.contains('d-none')) {
        modal.classList.remove('modal-show');
        setTimeout(() => {
            modal.classList.toggle('d-none');
            modal.innerHTML = '';
            currentSubtasks = [];
            currentAssignees = [];
        }, MODAL_FADE_TIME);
    }
    else {
        modalFadeIn(modal);
    }
}


/**
 * Controls the display of the 'Add Task' modal
 * @param {Object} modal The modal window to be handled
 */
function controlAddTaskModal(modal) {
    controlHeaderNavVisibility();
    if (!modal.classList.contains('d-none')) {
        modal.classList.remove('modal-show');
        setTimeout(() => {
            const modalContentContainer = document.getElementById('modal-add-task-content');
            modal.classList.toggle('d-none');
            modalContentContainer.innerHTML = '';
            currentSubtasks = [];
            currentAssignees = [];
        }, MODAL_FADE_TIME);
    }
    else {
        modalFadeIn(modal);
    }
}


/**
 * Controls the fade-in of the modal window
 * @param {Object} modal The modal window to be handled
 */
function modalFadeIn(modal) {
    modal.classList.toggle('d-none');
    setTimeout(() => {
        modal.classList.add('modal-show');
    }, 1);
}


/**
 * Ensures that the reader mode is active upon opening the task viewer
 */
function controlReaderVisibility() {
    const viewer = document.getElementById('modal-task-reader');
    if (viewer.classList.contains('d-none')) toggleTaskEditMode();
}


/**
 * Controls the visibility of the header navigation when "AddTask" overlay is open
 */
function controlHeaderNavVisibility() {
    const headerNav = document.getElementById('header-nav');
    headerNav.classList.toggle('header-nav-modal');
}


/**
 * Handles the click on a task card
 * @param {Event} event The user action
 * @param {Number} statusId The ID of the task's status
 * @param {Number} taskId The ID of the task
 */
function clickOnTask(event, statusId, taskId) {
    if (isTouchDevice) {
        const mouseX = event.clientX;
        const mouseY = event.clientY;
        openTaskContext(statusId, taskId, mouseX, mouseY);
    }
    else {
        openViewer(statusId, taskId);
    }
}


/**
 * Opens the modal for creating a new task
 */
async function openAddTask() {
    await loadHTML('modal-add-task-content', './assets/templates/add_task__template.html')

    await initAddTaskForm();

    toggleModal('modal-add-task');
}


/**
 * Performs the search
 */
function searchTasks() {
    const searchTerm = document.getElementById('find-task--input').value.toLowerCase();
    searchResult = [[], [], [], []];

    if (!searchTerm) {
        renderTasks();
        return;
    }

    for (let i = 0; i < tasks.length; i++) {
        for (let t = 0; t < tasks[i].length; t++) {
            if (tasks[i][t]['title'].toLowerCase().indexOf(searchTerm) >= 0 ||
                tasks[i][t]['desc'].toLowerCase().indexOf(searchTerm) >= 0) {
                searchResult[i].push({ statusId: i, taskId: t });
            }
        }
    }

    renderSearchResult();
}


/**
 * Renders the search result to the board
 */
function renderSearchResult() {
    for (let i = 0; i < searchResult.length; i++) {
        renderTasksStatusBySearch(i);
    }
}


/**
 * Renders the found tasks to their respective status containers
 * @param {Number} statusId The status ID
 */
function renderTasksStatusBySearch(statusId) {
    const statusContainer = document.getElementById(`tasks-status-${statusId}`);
    statusContainer.innerHTML = '';
    if (searchResult[statusId].length == 0) {
        showMsgNoTask(statusId, true);
    }
    else {
        showMsgNoTask(statusId, false);
        for (let t = 0; t < searchResult[statusId].length; t++) {
            renderSingleTaskCard(searchResult[statusId][t].statusId,
                searchResult[statusId][t].taskId,
                statusContainer);
        }
    }
}


/**
 * Renders a new task to status 0
 */
function renderNewTask() {
    const newTaskId = tasks[0].length - 1;
    const statusContainer = document.getElementById(`tasks-status-0`);
    renderSingleTaskCard(0, newTaskId, statusContainer);
    toggleModal('modal-add-task');
}

function doNotClose(event) {
    event.stopPropagation();
}