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

    subtasksElem.style.minHeight = `${calcContainerHeight(subtasks.length)}px`;
}


function calcContainerHeight(elemCount) {
    const elemSubtask = document.getElementsByClassName('modal-task-subtask')[0];
    const styles = window.getComputedStyle(elemSubtask);
    const marginTop = styles.marginTop.split('px')[0];
    const marginBtm = styles.marginBottom.split('px')[0];
    const fontSize = styles.fontSize.split('px')[0];
    let minHeight = (fontSize + marginTop + marginBtm) * elemCount;
    if (minHeight > 100) minHeight = 100;

    return minHeight;
}


function listSubtasksEditor(subtasks) {
    currentSubtasks = Array.from(subtasks);

    renderSubtasksEditor();
}


function renderSubtasksEditor() {
    const subtasksList = document.getElementById('subtask-list');
    subtasksList.innerHTML = '';

    if (currentSubtasks.length == 0) return;

    for (let i = 0; i < currentSubtasks.length; i++) {
        const desc = currentSubtasks[i]['title'];
        const status = currentSubtasks[i]['status'];
        let statusSign = getStatusSign(status);

        subtasksList.innerHTML += renderSubtaskDynamic(i, desc, statusSign);
    }
}


function addSubtaskEditor(input, container, dropdown) {
    const inputSubtask = document.getElementById('subtask-input');
    
    if (inputSubtask.value.length >= 1) {
        currentSubtasks.push({
            'title': inputSubtask.value,
            'status': false
        });
        inputSubtask.value = '';
        hideInputField(input, container, dropdown);
    }
    addSubtaskToList();
}


function addSubtaskToList() {
    const subtasksList = document.getElementById('subtask-list');
    const index = currentSubtasks.length - 1;
    const desc = currentSubtasks[index]['title'];
    const statusSign = getStatusSign(false);
    subtasksList.innerHTML += renderSubtaskDynamic(index, desc, statusSign);
}


function getStatusSign(status) {
    if (status) {
        return './assets/img/checkbox-checked.svg';
    }
    else {
        return './assets/img/checkbox-unchecked.svg';
    }
}


function deleteSubtaskEditor(index) {
    currentSubtasks.splice(index, 1);
    renderSubtasksEditor();
}


function toggleStatusSubtask(index) {
    const checkbox = document.getElementById(`subtask-status-${index}`);
    let status = currentSubtasks[index]['status'];
    currentSubtasks[index]['status'] = !status;
    checkbox.src = getStatusSign(currentSubtasks[index]['status']);
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


/**
 * Saves the changes made in the task editor
 */
async function saveChanges() {    
    const data = [
        {
            'value': document.getElementById('title').value,
            'required': document.getElementById('required0')
        },
        {
            'value': document.getElementById('description').value,
            'required': document.getElementById('required1')
        },
        {
            'value': document.getElementById('date-input').value,
            'required': document.getElementById('required4')
        },
        {
            'value': currentAssignees,
            'required': document.getElementById('required3')
        }
    ];

    if (!validateData(data)) return;

    writeDataToArray();

    renderDataToViewer(openedTask['statusId'], openedTask['taskId']);
    updateTaskCard();

    try {
        await saveOnServer('tasks', tasks);
    } catch {
        console.log('[tasks] not saved on server.');
    }

    toggleTaskEditMode();
}


function validateData(data) {
    let isFormValid = true;
    for (let i = 0; i < data.length; i++) {
        const currData = data[i]['value'].length;
        const currRequ = data[i]['required'];

        if (currData == 0) {
            isFormValid = false;
            currRequ.classList.remove('hidden');
        }
        else {
            currRequ.classList.add('hidden');
        }
    }

    return isFormValid;
}


function writeDataToArray() {
    currTask = tasks[openedTask.statusId][openedTask.taskId];
    currTask['title'] = document.getElementById('title').value;
    currTask['desc'] = document.getElementById('description').value;
    currTask['date'] = document.getElementById('date-input').value;
    currTask['prio'] = currentPrio;
    currTask['subtasks'] = Array.from(currentSubtasks);
    currTask['assignees'] = Array.from(getAssigneesEmails());
}


function getAssigneesEmails() {
    let assigneesEmails = [];
    for (let i = 0; i < currentAssignees.length; i++) {
        assigneesEmails.push(currentAssignees[i]['email']);
    }
    return assigneesEmails;
}


function updateTaskCard() {
    const statusId = openedTask['statusId'];
    const taskId = openedTask['taskId'];
    const taskCard = document.getElementById(`task-${statusId}-${taskId}`);
    const cat = getCategory(statusId, taskId);
    const catColor = getCategoryColor(cat);
    const prio = getPriority(statusId, taskId);

    // taskCard.innerHTML = '';
    taskCard.innerHTML = renderTaskCardContent(statusId, taskId, cat, catColor, prio);
}