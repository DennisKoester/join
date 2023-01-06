/**
 * Renders the task card to the board
 * @param {Number} statusId The status ID (0-3)
 * @param {Number} taskId The task ID within the status
 * @param {String} taskCat The category name
 * @param {String} taskCatColor The category color
 * @param {Number} taskPrio The task's priority
 * @returns HTML
 */
function renderTaskCard(statusId, taskId, taskCat, taskCatColor, taskPrio) {
    return /*html*/ `
        <div id="task-${statusId}-${taskId}" class="task-card"
                onclick="clickOnTask(event, ${statusId}, ${taskId})"
                draggable="true" ondragstart="dragStart(${statusId}, ${taskId})">
            ${renderTaskCardContent(statusId, taskId, taskCat, taskCatColor, taskPrio)}
        </div>
    `;
}


/**
 * Renders the content of the task card
 * @param {Number} statusId The status ID (0-3)
 * @param {Number} taskId The task ID within the status
 * @param {String} taskCat The category name
 * @param {String} taskCatColor The category color
 * @param {Number} taskPrio The task's priority
 * @returns HTML
 */
function renderTaskCardContent(statusId, taskId, taskCat, taskCatColor, taskPrio) {
    return /* html */ `
        <div class="task-cat ${taskCatColor}">${taskCat}</div>
        <div class="task-title">${tasks[statusId][taskId]['title']}</div>
        <div class="task-description">${tasks[statusId][taskId]['desc']}</div>
        ${getSubtasksProgress(statusId, taskId)}
        <div class="task-card--footer">
            <div class="assignees">
                ${getAssignees(statusId, taskId)}
            </div>
            <img src="${prio[taskPrio]['sign-color']}" alt="${prio[taskPrio]['name']}">
        </div>
    `;
}


/**
 * Renders the progress information
 * @param {Number} statusId The status ID (0-3)
 * @param {Number} taskId The task ID within the status
 * @returns 
 */
function renderSubtasksProgress(statusId, taskId) {
    return /*html*/ `
        <div class="progress-container">
            <div class="progress-bar-bg">
                <div class="progress-bar" style="width: ${getSubtasksDoneInPerc(statusId, taskId)}%"></div>
            </div>
            <span class="progress-text">${getSubtasksDone(statusId, taskId)}/${tasks[statusId][taskId]['subtasks'].length} Done</span>
        </div>
    `;
}


/**
 * Renders the list of assignees as badges with short names
 * @param {String} color The user's color
 * @param {String} shortName The user's short name
 * @returns HTML
 */
function renderAssigneesList(color, shortName) {
    return /* html */ `
        <div class="assignee" style="background-color: ${color}">${shortName}</div>
    `;
}


/**
 * Renders a badge to show the number of assignees whose badge is not shown if there are more than 3 assignees
 * @param {Number} diff The difference of number of assignees minus 2
 * @returns HTML
 */
function renderAssigneesMore(diff) {
    return /* html */ `
        <div class="assignee" style="background-color: var(--bg-color-main)">+${diff}</div>
    `;
}


/**
 * Renders the subtask list to the task viewer
 * @param {String} desc The subtask's description
 * @param {String} statusSign The URL of the status sign
 * @returns HTML
 */
function renderSubtaskForViewer(index, desc, checkbox) {
    return /* html */ `
        <div class="modal-task-subtask">
            <img id="subtask-status-viewer-${index}" src="${checkbox}" onclick="toggleStatusSubtask(${index})" style="cursor: pointer">
            <span>${desc}</span>
        </div>
    `;
}


/**
 * Renders the subtask list to the task editor
 * @param {Number} index The ID of the subtask in the current listing
 * @param {String} desc The description of the subtask
 * @param {String} checkbox The URL of the status sign
 * @returns HTML
 */
function renderSubtaskForEditor(index, desc, checkbox) {
    return /*html*/ `
    <div class="subtask">
        <img id="subtask-status-${index}" src="${checkbox}" onclick="toggleStatusSubtask(${index})" style="cursor: pointer" alt="checkbox">
        <label for="">${desc}</label>
        <img onclick="deleteSubtaskEditor(${index})" src="./assets/img/black-x.svg" alt="" class="filter-btn">
    </div>`;
}


/**
 * Renders the assignee list to the task viewer
 * @param {String} name The name of the assignee
 * @param {String} shortName The short name of the assignee
 * @param {String} color The user's color
 * @returns HTML
 */
function renderAssigneesListFull(name, shortName, color) {
    return /* html */`
        <div class="modal-task-assignees-item">
            <div class="assignee modal-task-assignee" style="background-color: ${color}">${shortName}</div>
            <span>${name}</span>
        </div>
    `;
}