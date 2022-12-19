function renderDataToViewer(statusId, taskId) {
    let task = tasks[statusId][taskId];
    writeCategory(getCategory(statusId, taskId));
    writeTitleViewer(task['title']);
    writeDescViewer(task['desc']);
    writeDateViewer(task['date']);
    writePrio(getPriority(statusId, taskId));
    listSubtasksViewer(task['subtasks']);
    listAssigneesViewer(task['assignees']);
}


function renderDataToEditor(statusId, taskId) {
    let task = tasks[statusId][taskId];
    writeTitleEditor(task['title']);
    writeDescEditor(task['desc']);
    writeDateEditor(task['date']);
    setPrioBtn(getPriority(statusId, taskId));
    listAssigneesEditor(task['assignees']);
    listSubtasksEditor(task['subtasks']);
}


function writeCategory(category) {
    const catId = categories.findIndex(item => item['name'] == category);
    const catElem = document.getElementById('modal-task-cat');

    catElem.classList.add(categories[catId]['color']);
    catElem.innerHTML = category;
}


function writeTitleViewer(title) {
    const titleElemViewer = document.getElementById('modal-task-title');

    titleElemViewer.innerHTML = title;
}


function writeTitleEditor(title) {
    const titleElemEditor = document.querySelector('#modal-task-edit #title');

    titleElemEditor.value = title;
}


function writeDescViewer(desc) {
    const descElemViewer = document.getElementById('modal-task-desc');

    descElemViewer.innerHTML = desc;
}


function writeDescEditor(desc) {
    const descElemEditor = document.querySelector('#modal-task-edit #description')

    descElemEditor.value = desc;
}


function writeDateViewer(dateAsString) {
    const dateElemViewer = document.getElementById('modal-task-date');
    let date = new Date(dateAsString + "T00:00:00.000");

    date = date.toLocaleDateString('en-GB', {year: 'numeric', month: '2-digit', day: '2-digit'});
    dateElemViewer.innerHTML = date;
}


function writeDateEditor(dateAsString) {
    const dateElemEditor = document.querySelector('#modal-task-edit #date-input');

    dateElemEditor.value = dateAsString;
}


function writePrio(priority) {
    const prioElem = document.getElementById('modal-task-prio');
    const prioName = document.getElementById('modal-task-prio-text');
    const prioImg = document.getElementById('modal-task-prio-img');

    prioElem.style.backgroundColor = prio[priority]['color'];
    prioName.innerHTML = prio[priority]['name'];
    prioImg.src = prio[priority]['sign-white'];
}


function setPrioBtn(priority) {
    setPrio(priority);
}


function listSubtasksViewer(subtasks) {
    const subtasksElem = document.getElementById('modal-task-subtasks');

    subtasksElem.innerHTML = '';

    if (subtasks.length == 0) return;

    for (let i = 0; i < subtasks.length; i++) {
        const desc = subtasks[i]['title'];
        const status = subtasks[i]['status'];
        let statusSign = getStatusSign(status);

        subtasksElem.innerHTML += renderSubtaskStatic(desc, statusSign);
    }
}


function listSubtasksEditor(subtasks) {
    const subtasksList = document.getElementById('subtask-list');
    currentSubtasks = Array.from(subtasks);

    subtasksList.innerHTML = '';

    if (currentSubtasks.length == 0) return;

    for (let i = 0; i < currentSubtasks.length; i++) {
        const desc = currentSubtasks[i]['title'];
        const status = currentSubtasks[i]['status'];
        let statusSign = getStatusSign(status);

        subtasksList.innerHTML += renderSubtaskDynamic(i, desc, statusSign);
    }
}


function getStatusSign(status) {
    if (status) {
        return './assets/img/checkbox-checked.svg';
    }
    else {
        return './assets/img/checkbox-unchecked.svg';
    }
}


function listAssigneesViewer(assignees) {
    const assigneesElem = document.getElementById('modal-task-assignees');
    assigneesElem.innerHTML = '';

    for (let i = 0; i < assignees.length; i++) {
        const userId = users.findIndex(item => item['email'] == assignees[i]);
        const name = users[userId]['name'];
        const shortName = users[userId]['short_name'];
        const color = users[userId]['color'];

        assigneesElem.innerHTML += renderAssigneesListFull(name, shortName, color);
    }
}


function listAssigneesEditor(assignees) {
    currentAssignees = [];
    for (let i = 0; i < assignees.length; i++) {
        currentAssignees.push(users.find(item => item['email'] == assignees[i]));
    }

    // currentAssignees = Array.from(assignees);
    renderAssignees();
}