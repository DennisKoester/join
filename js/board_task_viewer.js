/**
 * Opens the task viewer
 * @param {Number} statusId The ID of the respective status
 * @param {Number} taskId The ID of the task within the status
 */
async function openViewer(statusId, taskId) {
    await loadHTML('modal-task', './assets/templates/view_task__template.html')

    if (isTouchDevice) controlVisTaskCtx();

    openedTask.statusId = statusId;
    openedTask.taskId = taskId;

    renderDataToViewer(statusId, taskId);
    renderDataToEditor(statusId, taskId);

    toggleModal('modal-task');
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
 * Renders the data to the task viewer
 * @param {Number} statusId The ID of the respective status
 * @param {Number} taskId The ID of the task within the status
 */
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


/**
 * Renders the data to the task editor
 * @param {Number} statusId The ID of the respective status
 * @param {Number} taskId The ID of the task within the status
 */
function renderDataToEditor(statusId, taskId) {
    let task = tasks[statusId][taskId];
    writeTitleEditor(task['title']);
    writeDescEditor(task['desc']);
    writeDateEditor(task['date']);
    setPrioBtn(getPriority(statusId, taskId));
    listAssigneesEditor(task['assignees']);
    listSubtasksEditor(task['subtasks']);
}


/**
 * Sets the category settings to the category badge in task viewer
 * @param {String} category The name of the category
 */
function writeCategory(category) {
    const catId = categories.findIndex(item => item['name'] == category);
    const catElem = document.getElementById('modal-task-cat');

    catElem.classList.add(categories[catId]['color']);
    catElem.innerHTML = category;
}


/**
 * Writes the title to the task viewer
 * @param {String} title The title of the task
 */
function writeTitleViewer(title) {
    const titleElemViewer = document.getElementById('modal-task-title');
    titleElemViewer.innerHTML = title;
}


/**
 * Writes the title to the task editor
 * @param {String} title The title of the task
 */
function writeTitleEditor(title) {
    const titleElemEditor = document.querySelector('#modal-task-edit #title');
    titleElemEditor.value = title;
}


/**
 * Writes the description to the task viewer
 * @param {String} desc The description of the task
 */
function writeDescViewer(desc) {
    const descElemViewer = document.getElementById('modal-task-desc');
    descElemViewer.innerHTML = desc;
}


/**
 * Writes the description to the task editor
 * @param {String} desc The description of the task
 */
function writeDescEditor(desc) {
    const descElemEditor = document.querySelector('#modal-task-edit #description')
    descElemEditor.value = desc;
}


/**
 * Writes the due date to the task viewer in en-GB format
 * @param {String} dateAsString The due date of the task
 */
function writeDateViewer(dateAsString) {
    const dateElemViewer = document.getElementById('modal-task-date');
    let date = new Date(dateAsString + "T00:00:00.000");

    date = date.toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' });
    dateElemViewer.innerHTML = date;
}


/**
 * Writes the due date to the task editor
 * @param {String} dateAsString The due date of the task
 */
function writeDateEditor(dateAsString) {
    const dateElemEditor = document.querySelector('#modal-task-edit #date-input');
    dateElemEditor.value = dateAsString;
}


/**
 * Writes the priority settings to the task viewer
 * @param {Number} priority The priority of the task
 */
function writePrio(priority) {
    const prioElem = document.getElementById('modal-task-prio');
    const prioName = document.getElementById('modal-task-prio-text');
    const prioImg = document.getElementById('modal-task-prio-img');

    prioElem.style.backgroundColor = prio[priority]['color'];
    prioName.innerHTML = prio[priority]['name'];
    prioImg.src = prio[priority]['sign-white'];
}


/**
 * Sets the priority button in the task editor
 * @param {Number} priority The priority of the task
 */
function setPrioBtn(priority) {
    setPrio(priority);
}


/**
 * Renders the subtasks to the task viewer
 * @param {Array} subtasks The list of subtasks of the respective task
 * @returns 
 */
function listSubtasksViewer(subtasks) {
    const subtasksElem = document.getElementById('modal-task-subtasks');

    subtasksElem.innerHTML = '';

    if (subtasks.length == 0) return;

    for (let i = 0; i < subtasks.length; i++) {
        const desc = subtasks[i]['title'];
        const status = subtasks[i]['status'];
        let statusSign = getStatusSign(status);

        subtasksElem.innerHTML += renderSubtaskForViewer(i, desc, statusSign);
    }

    subtasksElem.style.minHeight = `${calcContainerHeight(subtasks.length)}px`;
}


/**
 * Calculates the minimum height of the subtask container
 * @param {Number} elemCount The number of subtasks
 * @returns The minimum height
 */
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


/**
 * Initiates the rendering of subtasks to the task editor
 * @param {Array} subtasks The list of subtasks of the respective task
 */
function listSubtasksEditor(subtasks) {
    currentSubtasks = JSON.parse(JSON.stringify(subtasks));
    renderSubtasksEditor();
}


/**
 * Renders the subtasks to the task editor
 */
function renderSubtasksEditor() {
    const subtasksList = document.getElementById('subtask-list');
    subtasksList.innerHTML = '';

    if (currentSubtasks.length == 0) return;

    for (let i = 0; i < currentSubtasks.length; i++) {
        const desc = currentSubtasks[i]['title'];
        const status = currentSubtasks[i]['status'];
        let statusSign = getStatusSign(status);

        subtasksList.innerHTML += renderSubtaskForEditor(i, desc, statusSign);
    }
}


/**
 * Adds a subtask in the task editor
 * @param {Object} input
 * @param {Object} container 
 * @param {Object} dropdown 
 */
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


/**
 * Adds a subtask to the editor on [Enter]
 * @param {event} e The key event
 */
function enterFunctionSubtasksEditor(e) {
    if (e.code == "Enter") {
        addSubtaskEditor('subtask-input', 'input-btns', 'plus-icon');
    }
}


/**
 * Adds a new subtask to the listing
 */
function addSubtaskToList() {
    const subtasksList = document.getElementById('subtask-list');
    const index = currentSubtasks.length - 1;
    const desc = currentSubtasks[index]['title'];
    const statusSign = getStatusSign(false);
    subtasksList.innerHTML += renderSubtaskForEditor(index, desc, statusSign);
}


/**
 * Sets the status sign of a subtask
 * @param {Number} status The status of a subtask
 * @returns 
 */
function getStatusSign(status) {
    if (status) {
        return './assets/img/checkbox-checked.svg';
    }
    else {
        return './assets/img/checkbox-unchecked.svg';
    }
}


/**
 * Deletes a subtask in the task editor
 * @param {Number} index The ID of the subtask
 */
function deleteSubtaskEditor(index) {
    currentSubtasks.splice(index, 1);
    renderSubtasksEditor();
}


/**
 * Toggles the status of a subtask in the task editor
 * @param {Number} index The ID of the subtask
 */
async function toggleStatusSubtask(index) {
    const checkboxEditor = document.getElementById(`subtask-status-${index}`);
    const checkboxViewer = document.getElementById(`subtask-status-viewer-${index}`)

    let status = currentSubtasks[index]['status'];
    currentSubtasks[index]['status'] = !status;
    checkboxEditor.src = getStatusSign(currentSubtasks[index]['status']);
    checkboxViewer.src = getStatusSign(currentSubtasks[index]['status']);

    await saveSubtasksFromViewer();
}


/**
 * Saves changes on subtasks made in TaskViewer
 */
async function saveSubtasksFromViewer() {
    const reader = document.getElementById('modal-task-reader');

    if (!reader.classList.contains('d-none')) {
        tasks[openedTask.statusId][openedTask.taskId]['subtasks'] = JSON.parse(JSON.stringify(currentSubtasks));
        await saveOnServer('tasks', tasks);
        updateTaskCard();
    }
}


/**
 * Renders the list of assignees to the task viewer
 * @param {Array} assignees The list of assignees of the respective task
 */
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


/**
 * Renders the list of assignees to the task editor
 * @param {Array} assignees The list of assignees of the respective task
 */
function listAssigneesEditor(assignees) {
    currentAssignees = [];

    renderAssignees();

    for (let i = 0; i < assignees.length; i++) {
        selectAssignee(i);
    }

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
    await saveOnServer('tasks', tasks);
    toggleTaskEditMode();
}


/**
 * Validates the data from the task editor
 * @param {Array} data The data to be validated
 * @returns Validation result
 */
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


/**
 * Writes the data from the task editor to the array
 */
function writeDataToArray() {
    currTask = tasks[openedTask.statusId][openedTask.taskId];
    currTask['title'] = document.getElementById('title').value;
    currTask['desc'] = document.getElementById('description').value;
    currTask['date'] = document.getElementById('date-input').value;
    currTask['prio'] = currentPrio;
    currTask['subtasks'] = Array.from(currentSubtasks);
    currTask['assignees'] = Array.from(getAssigneesEmails());
}


/**
 * Obtains the email addresses of the assignees
 * @returns The email addresses of the assignees
 */
function getAssigneesEmails() {
    let assigneesEmails = [];
    for (let i = 0; i < currentAssignees.length; i++) {
        assigneesEmails.push(currentAssignees[i]['email']);
    }
    return assigneesEmails;
}


/**
 * Updates the edited task card
 */
function updateTaskCard() {
    const statusId = openedTask['statusId'];
    const taskId = openedTask['taskId'];
    const taskCard = document.getElementById(`task-${statusId}-${taskId}`);
    const cat = getCategory(statusId, taskId);
    const catColor = getCategoryColor(cat);
    const prio = getPriority(statusId, taskId);

    taskCard.innerHTML = renderTaskCardContent(statusId, taskId, cat, catColor, prio);
}