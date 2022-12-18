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
            const cat = getCategory(statusId, t);
            const catColor = getCategoryColor(cat);
            const prio = getPriority(statusId, t);
            statusContainer.innerHTML += renderTaskCard(statusId, t, cat, catColor, prio);
        }
    }
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


function getCategory(statusId, taskId) {
    return tasks[statusId][taskId]['cat'];
}


function getCategoryColor(category) {
    const id = categories.findIndex(item => item['name'] == category);
    return categories[id]['color'];
}


function getSubtasksProgress(statusId, taskId) {
    if (tasks[statusId][taskId]['subtasks'].length == 0) return '';

    return renderSubtasksProgress(statusId, taskId);
}


function getSubtasksDone(statusId, taskId) {
    return tasks[statusId][taskId]['subtasks'].filter(item => item['status']).length;
}


function getSubtasksDoneInPerc(statusId, taskId) {
    const subtasksDone = getSubtasksDone(statusId, taskId);
    const subtasksCount = tasks[statusId][taskId]['subtasks'].length;
    
    return (subtasksDone / subtasksCount) * 100;
}


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


function createAssigneeBadge(statusId, taskId, assigneeId) {
    const mail = tasks[statusId][taskId]['assignees'][assigneeId];
    const id = users.findIndex(user => user['email'] == mail);
    const color = users[id]['color'];
    const short = users[id]['short_name'];

    return renderAssigneesList(color, short);
}


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


/**
 * Opens the task viewer
 * @param {Number} statusId The ID of the respective status
 * @param {Number} taskId The ID of the task within the status
 */
async function openViewer(statusId, taskId) {
    await loadHTML('modal-task', './assets/templates/view_task__template.html')
    
    
    // TODO: Render data
    readData(statusId, taskId);
    
    
    toggleModal('modal-task');
    // setTimeout(() => {
    //     toggleModal('modal-task');
    // }, 500);
}


/**
 * Toggles between reading mode and editing mode in the task viewer modal
 */
function toggleTaskEditMode() {
    const reader = document.getElementById('modal-task-reader');
    const editor = document.getElementById('modal-task-edit');
    reader.classList.toggle('d-none');
    editor.classList.toggle('d-none');
}


/**
 * Opens the modal for creating a new task
 */
async function openAddTask() {
    await loadHTML('modal-add-task-content', './assets/templates/add_task__template.html')

    initAddTask();
    // TODO: Render data


    toggleModal('modal-add-task');
    // setTimeout(() => {
    //     toggleModal('modal-add-task');
    // }, 500);
}


/**
 * Saves the changes made in the editor modal
 */
function saveChanges() {

    // TODO:
    // - Write the changes to the Array and the Server
    // - Update reader mode
    // - Update board overview

    toggleTaskEditMode();

}