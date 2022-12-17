function renderTaskCard(statusId, taskId, taskCat, taskCatColor, taskPrio) {
    return /*html*/ `
        <div id="task-${statusId}-${taskId}" class="task-card" onclick="openViewer(${statusId}, ${taskId})">
            <div class="task-cat" style="background-color: ${taskCatColor}">${taskCat}</div>
            <div class="task-title">${tasks[statusId][taskId]['title']}</div>
            <div class="task-description">${tasks[statusId][taskId]['desc']}</div>
            ${getSubtasksProgress(statusId, taskId)}
            <div class="task-card--footer">
                <div class="assignees">
                    ${getAssignees(statusId, taskId)}
                </div>
                <img src="${prio[taskPrio]['sign-color']}" alt="${prio[taskPrio]['name']}">
            </div>
        </div>
    `;
}


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


function renderAssignees(color, shortName) {
    return `
        <div class="assignee" style="background-color: ${color}">${shortName}</div>
    `;
}


function renderAssigneesMore(diff) {
    return `
        <div class="assignee" style="background-color: var(--bg-color-main)">+${diff}</div>
    `;
}