/**
 * The selected task to be dragged
 */
let selectedTask = {
    status: -1,
    task: -1
};
/**
 * The ID of the target status container
 */
let target = -1;


/**
 * Rotates the task card upon drag start
 * @param {Number} statusId The status ID
 * @param {Number} taskId The task's ID within the status
 */
function rotateTaskCard(statusId, taskId) {
    const taskCard = document.getElementById(`task-${statusId}-${taskId}`);
    taskCard.classList.add('task-card--dragged');
}


/**
 * Removes the rotation of the task card after dragging or if drag-andn-drop was aborted
 * @param {Number} statusId The status ID
 * @param {Number} taskId The task's ID within the status
 */
function unrotateTaskCard(statusId, taskId) {
    const taskCard = document.getElementById(`task-${statusId}-${taskId}`);
    taskCard.classList.remove('task-card--dragged');
}


/**
 * Initiates drag-and-drop
 * @param {Number} statusId The status ID
 * @param {Number} taskId The task's ID within the status
 */
function dragStart(statusId, taskId) {
    setTimeout(() => {
        selectedTask.status = statusId;
        selectedTask.task = taskId;

        toggleWildcards();
        
        rotateTaskCard(statusId, taskId);
    }, 30);
}


/**
 * Recognizes the dragging of the task card over any status container
 * @param {Event} event The user action
 * @param {Number} enteredStatusId The targeted status ID
 */
function dragOver(event, enteredStatusId) {
    event.preventDefault();
    target = enteredStatusId;
}


/**
 * Resets the targeted status container during drag-and-drop
 */
function dragLeave() {
    target = -1;
}


/**
 * Performs the end of drag-and-drop
 */
function dragEnd() {
    toggleWildcards();

    if (target == -1) {
        unrotateTaskCard(selectedTask.status, selectedTask.task);
    }
}


/**
 * Performs the dropping of a task card to the targeted status container
 * @param {Number} droppedOnStatusId The ID of the targeted status container
 */
function dropTask(droppedOnStatusId) {
    if (droppedOnStatusId == selectedTask.status) {
        unrotateTaskCard(selectedTask.status, selectedTask.task);
    }
    else {
        moveTask(droppedOnStatusId);
        toggleWildcards();
    }
}


/**
 * Toggles the wildcards at start and end of drag-and-drop
 */
function toggleWildcards() {
    const wildcards = document.getElementsByClassName('wildcard');

    for (let w = 0; w < wildcards.length; w++) {
        if (w != selectedTask.status) {
            wildcards[w].classList.toggle('d-none');
        }
    }
}


/**
 * Moves the selected task to its new position
 * @param {Number} targetStatus The ID of the targeted status container
 */
function moveTask(targetStatus) {
    const statusContainer = document.getElementById(`tasks-status-${targetStatus}`)
    const searchTerm = document.getElementById('find-task--input').value;
    updateData(targetStatus);
    
    // Take active search function into account when updating after drag-and-drop
    if (!searchTerm) {
        renderTasksStatus(selectedTask.status);
        renderSingleTaskCard(targetStatus, tasks[targetStatus].length - 1, statusContainer);
        if (tasks[targetStatus].length == 1) showMsgNoTask(targetStatus, false);
    }
    else {
        searchTasks();
    }
}


/**
 * Updates the data structure after drag-and-drop
 * @param {Number} targetStatus The ID of the targeted status container
 */
function updateData(targetStatus) {
    const task = tasks[selectedTask.status].splice(selectedTask.task, 1);
    tasks[targetStatus].push(task[0]);

    saveOnServer('tasks', tasks);
}


/**
 * Opens the task context menu
 * @param {Number} statusId The status ID
 * @param {Number} taskId The task's ID within the status
 * @param {Number} posX The clicked x-position
 * @param {Number} posY The clicked y-position
 */
function openTaskContext(statusId, taskId, posX, posY) {
    const ctxMenu = document.getElementById('context-menu-task');
    setClickParams(statusId, taskId);
    defineCtxSub(statusId);
    controlPosTaskCtx(ctxMenu, posX, posY);
    controlVisTaskCtx();
}


/**
 * Sets the parameters of the context menu
 * @param {Number} statusId The status ID
 * @param {Number} taskId The task's ID within the status
 */
function setClickParams(statusId, taskId) {
    const ctxDetails = document.getElementById('context-task--details');
    const subItems = document.querySelectorAll('#context-sub--move span');
    
    ctxDetails.setAttribute('onclick', `openViewer(${statusId}, ${taskId})`);

    for (let i = 0; i < subItems.length; i++) {
        // Function definition: moveTask({move from}, {move to}, {task ID})
        subItems[i].setAttribute('onclick', `moveTaskByCtx(${statusId}, ${i}, ${taskId})`);
    }
}


/**
 * Sets the position of the context menu depending on the clicked position
 * @param {Object} ctxMenu The context menu
 * @param {Number} posX The clicked x-position
 * @param {Number} posY The clicked y-position
 */
function controlPosTaskCtx(ctxMenu, posX, posY) {
    if (ctxMenu.classList.contains('d-none')) {
        clickPos.x = posX;
        clickPos.y = posY;
        ctxMenu.style.top = `${posY - 50}px`;
        ctxMenu.style.left = `${posX - 70}px`;
    }
}


/**
 * Controls the display of the context menu
 */
function controlVisTaskCtx() {
    const ctxMain = document.getElementById('context-menu-task');
    const ctxSub = document.getElementById('context-sub--move');
    const isMainOff = ctxMain.classList.contains('d-none');
    const isSubOff = ctxSub.classList.contains('d-none');

    if (!isMainOff && !isSubOff) {
        toggleContextMenu('context-sub--move');
    }

    toggleContextMenu('context-menu-task');
}


/**
 * Defines the content of the sub context menu for moving a task
 * @param {Number} statusId The status ID
 */
function defineCtxSub(statusId) {
    const subItems = document.querySelectorAll('#context-sub--move span');
    
    for (let i = 0; i < subItems.length; i++) {
        if (i == statusId) {
            subItems[i].classList.add('d-none');
        }
        else {
            subItems[i].classList.remove('d-none');
        }
    }
}


/**
 * Opens the sub context menu
 */
function openContextSub() {
    controlContextSubPos();
    toggleContextMenu('context-sub--move');
}


/**
 * Sets the position of the sub context menu
 */
function controlContextSubPos() {
    const boundary = {
        right: window.innerWidth,
        bottom: window.innerHeight
    };
    const ctxSub = document.getElementById('context-sub--move');

    if (boundary.right - clickPos.x < 200) {
        ctxSub.style.left = 'unset';
        ctxSub.style.right = '100%';
    }
    else {
        ctxSub.style.right = 'unset';
        ctxSub.style.left = '100%';
    }

    if (boundary.bottom - clickPos.y < 180) {
        ctxSub.style.top = 'unset';
        ctxSub.style.bottom = '-8px';
    }
    else {
        ctxSub.style.bottom = 'unset';
        ctxSub.style.top = '20px';
    }
}


/**
 * Moves a task to another status
 * @param {Number} moveFrom The starting status ID
 * @param {Number} moveTo The targeted status ID
 * @param {Number} taskId The ID of the task
 */
function moveTaskByCtx(moveFrom, moveTo, taskId) {
    selectedTask.status = moveFrom;
    selectedTask.task = taskId;

    controlVisTaskCtx();

    moveTask(moveTo);
}