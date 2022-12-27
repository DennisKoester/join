let openedTask = {statusId: -1, taskId: -1};
let isTouchDevice = false;
let clickPos = {x: 0, y: 0};
let searchResult = [[], [], [], []];

async function initBoard() {
    await init();
    try {
        users = await loadFromServer('users');
        tasks = await loadFromServer('tasks');
    } catch {
        console.log('Data not loaded from server.');
    }
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
    modal.classList.toggle('d-none');

    if (id == 'modal-task') {
        controlReaderVisibility();
        if (modal.classList.contains('d-none')) {
            modal.innerHTML = '';
        }
    }

    if (id == 'modal-add-task') {
        controlHeaderNavVisibility();
        if (modal.classList.contains('d-none')) {
            const modalContentContainer = document.getElementById('modal-add-task-content');
            modalContentContainer.innerHTML = '';
        }
    }
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

    loadCategories();


    toggleModal('modal-add-task');
    // setTimeout(() => {
    //     toggleModal('modal-add-task');
    // }, 500);
}


function searchTasks() {
    const searchTerm = document.getElementById('find-task--input').value.toLowerCase();
    searchResult = [[], [], [], []];

    if (!searchTerm) {
        renderTasks();
        
        console.log('Suche zurückgesetzt.', searchResult);
        
        return;
    }

    for (let i = 0; i < tasks.length; i++) {
        for (let t = 0; t < tasks[i].length; t++) {
            if (tasks[i][t]['title'].toLowerCase().indexOf(searchTerm) >= 0 ||
                tasks[i][t]['desc'].toLowerCase().indexOf(searchTerm) >= 0) {
                    searchResult[i].push({statusId: i, taskId: t});
            }
        }
    }

    console.log('Suchergebnis:', searchResult);

    renderSearchResult();
}


function renderSearchResult() {
    for (let i = 0; i < searchResult.length; i++) {
        renderTasksStatusBySearch(i);
    }
}


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