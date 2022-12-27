let selectedTask = {
    status: -1,
    task: -1
};
let target = -1;

function rotateTaskCard(statusId, taskId) {
    const taskCard = document.getElementById(`task-${statusId}-${taskId}`);
    taskCard.classList.add('task-card--dragged');
}


function unrotateTaskCard(statusId, taskId) {
    const taskCard = document.getElementById(`task-${statusId}-${taskId}`);
    taskCard.classList.remove('task-card--dragged');
}


function dragStart(statusId, taskId) {
    selectedTask.status = statusId;
    selectedTask.task = taskId;

    toggleWildcards();
    
    rotateTaskCard(statusId, taskId);

    console.log(`Drag starts from Task [${statusId}, ${taskId}]`);
}


function dragOver(event, enteredStatusId) {
    event.preventDefault();
    target = enteredStatusId;
    console.log(`Dragging over Status ${enteredStatusId}`);
}


function dragLeave(leftStatusId) {
    target = -1;
    console.log(`Leaving Status ${leftStatusId}`);
}


function dragEnd() {
    toggleWildcards();

    if (target == -1) {
        unrotateTaskCard(selectedTask.status, selectedTask.task);
    }

    console.log('dragEnd has fired.')
}


function dropTask(droppedOnStatusId) {
    // toggleWildcards();
    if (droppedOnStatusId == selectedTask.status) {
        unrotateTaskCard(selectedTask.status, selectedTask.task);
    }
    else {
        moveTask(droppedOnStatusId);
        toggleWildcards();
    }
    console.log(`Dropping on Status ${droppedOnStatusId}`);
}


function toggleWildcards() {
    const wildcards = document.getElementsByClassName('wildcard');

    for (let w = 0; w < wildcards.length; w++) {
        if (w != selectedTask.status) {
            wildcards[w].classList.toggle('d-none');
        }
    }
}


function moveTask(targetStatus) {
    const statusContainer = document.getElementById(`tasks-status-${targetStatus}`)
    const searchTerm = document.getElementById('find-task--input').value;
    updateData(targetStatus);
    
    if (!searchTerm) {
        renderTasksStatus(selectedTask.status);
        renderSingleTaskCard(targetStatus, tasks[targetStatus].length - 1, statusContainer);
        if (tasks[targetStatus].length == 1) showMsgNoTask(targetStatus, false);
    }
    else {
        searchTasks();
    }
}


function updateData(targetStatus) {
    const task = tasks[selectedTask.status].splice(selectedTask.task, 1);
    tasks[targetStatus].push(task[0]);

    try {
        saveOnServer('tasks', tasks);
    } catch {
        console.log('[tasks] not saved on server.');
    }
}


function openTaskContext(statusId, taskId, posX, posY) {
    const ctxMenu = document.getElementById('context-menu-task');
    setClickParams(statusId, taskId);
    defineCtxSub(statusId);
    controlPosTaskCtx(ctxMenu, posX, posY);
    controlVisTaskCtx();
    
    console.log('Opening task context ...')
}


function setClickParams(statusId, taskId) {
    const ctxDetails = document.getElementById('context-task--details');
    const subItems = document.querySelectorAll('#context-sub--move span');
    
    ctxDetails.setAttribute('onclick', `openViewer(${statusId}, ${taskId})`);

    for (let i = 0; i < subItems.length; i++) {
        // Function definition: moveTask({move from}, {move to}, {task ID})
        subItems[i].setAttribute('onclick', `moveTaskByCtx(${statusId}, ${i}, ${taskId})`);
    }
}


function controlPosTaskCtx(ctxMenu, posX, posY) {
    if (ctxMenu.classList.contains('d-none')) {
        clickPos.x = posX;
        clickPos.y = posY;
        ctxMenu.style.top = `${posY - 50}px`;
        ctxMenu.style.left = `${posX - 70}px`;
    }
}


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


function openContextSub() {
    controlContextSubPos();
    toggleContextMenu('context-sub--move');
}


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


function moveTaskByCtx(moveFrom, moveTo, taskId) {
    selectedTask.status = moveFrom;
    selectedTask.task = taskId;

    controlVisTaskCtx();

    moveTask(moveTo);
}