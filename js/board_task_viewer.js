function readData(statusId, taskId) {
    writeCategory(getCategory(statusId, taskId));
    writeTitle(tasks[statusId][taskId]['title']);
    writeDescription(tasks[statusId][taskId]['desc']);
    writeDate(tasks[statusId][taskId]['date']);
    writePrio(getPriority(statusId, taskId));
    listSubtasks(tasks[statusId][taskId]['subtasks']);
    listAssignees(tasks[statusId][taskId]['assignees']);
}


function writeCategory(category) {
    const catId = categories.findIndex(item => item['name'] == category);
    const catElem = document.getElementById('modal-task-cat');

    catElem.style.backgroundColor = categories[catId]['color'];
    catElem.innerHTML = category;
}


function writeTitle(title) {
    const titleElem = document.getElementById('modal-task-title');

    titleElem.innerHTML = title;
}


function writeDescription(desc) {
    const descElem = document.getElementById('modal-task-desc');

    descElem.innerHTML = desc;
}


function writeDate(dateAsString) {
    const dateElem = document.getElementById('modal-task-date');
    let date = new Date(dateAsString + "T00:00:00.000");

    date = date.toLocaleDateString('en-GB', {year: 'numeric', month: '2-digit', day: '2-digit'});
    dateElem.innerHTML = date;
}


function writePrio(priority) {
    const prioElem = document.getElementById('modal-task-prio');
    const prioName = document.getElementById('modal-task-prio-text');
    const prioImg = document.getElementById('modal-task-prio-img');

    prioElem.style.backgroundColor = prio[priority]['color'];
    prioName.innerHTML = prio[priority]['name'];
    prioImg.src = prio[priority]['sign-white'];
}


function listSubtasks(subtasks) {
    const subtasksElem = document.getElementById('modal-task-subtasks');
    const subtasksCount = subtasks.length;

    subtasksElem.innerHTML = '';

    if (subtasks.length == 0) return;

    for (let i = 0; i < subtasksCount; i++) {
        const desc = subtasks[i]['title'];
        const status = subtasks[i]['status'];
        let statusSign = getStatusSign(status);

        subtasksElem.innerHTML += renderSubtaskStatic(desc, statusSign);
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


function listAssignees(assignees) {
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