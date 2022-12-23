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
    updateData(targetStatus);
    renderTasksStatus(selectedTask.status);
    renderSingleTaskCard(targetStatus, tasks[targetStatus].length - 1, statusContainer);

    if (tasks[targetStatus].length == 1) showMsgNoTask(targetStatus, false);
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