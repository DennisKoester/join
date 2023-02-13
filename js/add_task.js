let currentPrio = -1;
let currentCategory = '';
let currentCategoryColor = '';
let currentSubtasks = [];
let currentAssignees = [];


/**
 * Initiates the add task page
 */
async function initAddTask() {

    await init();
    await initAddTaskForm();
}


async function initAddTaskForm() {
    await loadCategories();
    await renderAssignees();
    await dateLimitation();
}


// Help Functions //


/**
 * Toggles a class list of an element
 * @param {number} id The ID of the element
 * @param {string} classList The classlist which will be toggled
 */
function toggleClassList(id, classList,) {
    document.getElementById(id).classList.toggle(classList);
}


/**
 * Toggles the visibility of the dropdown menu
 * @param {string} dropdown The dropdown container
 * @param {string} icon The triangle icon
 */
function toggleDropdown(dropdown, icon) {
    toggleClassList(dropdown, 'd-none');
    toggleClassList(icon, 'rotate180');
}


// Input Fields//


/**
 * Shows the input field and the color selection if needed
 * @param {string} inputContainer The input container
 * @param {string} container The dropdown container
 * @param {string} dropdown The dropdown itself
 * @param {string} icon The triangle icon
 */
function showInputField(inputContainer, container, dropdown, icon) {
    toggleClassList(inputContainer, 'd-none');
    toggleClassList(container, 'd-none');
    toggleDropdown(dropdown, icon);
    if (inputContainer == 'category-input-container') {
        toggleClassList('category-colors', 'd-none');
        hideDropDownOnClickOutside('overlay_category', 'category-dropdown-container');
    }
}


/**
 * Hides the input field and the color selection if needed
 * @param {string} input The input field
 * @param {string} inputContainer The input container
 * @param {string} container The dropwdown container
 */
function hideInputField(input, inputContainer, container) {
    document.getElementById(input).value = '';
    toggleClassList(inputContainer, 'd-none');
    toggleClassList(container, 'd-none');
    if (inputContainer == 'category-input-container') {
        toggleClassList('category-colors', 'd-none');
        resetActiveColor();
    }
}


/**
 * Shows the buttons inside the input field
 * @param {string} btns The Buttons from the input fields
 * @param {string} icon The triangle icon
 */
function showInputBtns(btns, icon) {
    document.getElementById(btns).classList.remove('d-none');
    document.getElementById(icon).classList.add('d-none');
}


/**
 * Resets the complete add task sheet
 */
function resetAddTask() {
    clearAllInputs();
    loadCategories();
    renderAssignees();
    resetActiveColor();
    setPrio();
    renderSubtasks();
    resetValidation();
}


/**
 * Clears all inputs and sets back the variables
 */
function clearAllInputs() {
    let title = document.getElementById('title');
    let desc = document.getElementById('description');
    let date = document.getElementById('date-input');
    let cat = document.getElementById('selected-category');
    let catInput = document.getElementById('category-input');
    let subtask = document.getElementById('subtask-input');

    cat.innerHTML = 'Select task category';
    title.value = '';
    desc.value = '';
    date.value = '';
    catInput.value = '';
    subtask.value = '';
    currentPrio = -1;
    currentAssignees = [];
    currentCategory = [];
    currentCategoryColor = '';
    currentSubtasks = [];
}


/**
 * Adds a new category on [Enter]
 * @param {object} e The key event
 */
function enterFunctionNewCategory(e) {
    if (e.code == "Enter") {
        addNewCategory('category-input', 'category-input-container', 'category-dropdown-container');
    }
}


// Assignee Section //


function renderAssignees() {
    let list = document.getElementById('assignee-list');
    let badgeList = document.getElementById('add-task-assignees');
    list.innerHTML = '';
    badgeList.innerHTML = '';

    for (let i = 0; i < alphabet.length; i++) {
        for (let j = 0; j < users.length; j++) {
            if (alphabet[i] == getFirstLetterOfLastName(j)) {
                let assignee = users[j]['name'];
                list.innerHTML += assigneeHTML(j, assignee);
            }
        }
    }
}


/**
 * Shows the badge of selected assignee
 */
function showAssigneeBadge() {
    let badgeList = document.getElementById('add-task-assignees');
    badgeList.innerHTML = '';

    for (let i = 0; i < currentAssignees.length; i++) {
        let initials = currentAssignees[i]['short_name'];
        let color = currentAssignees[i]['color'];
        badgeList.innerHTML += assigneeBadgeHTML(initials, color);
    }
}


/**
 * Selects an assignee for the task
 * @param {number} i Index of the selected assignee
 */
function selectAssignee(i) {
    let user = currentAssignees.find(element => element['email'] == users[i]['email']);

    if (!user) {
        currentAssignees.push(users[i]);
    } else {
        index = currentAssignees.findIndex(element => element['email'] == user['email']);
        currentAssignees.splice(index, 1);
    }
    changeCheckbox(i);
    showAssigneeBadge();
    validationForField(3, currentAssignees);
}


/**
 * Toggles the checkbox of the assignee if is selected or not
 * @param {number} i Index of the clicked checkbox
 */
function changeCheckbox(i) {
    let checkbox = document.getElementById(`checkbox${i}`);
    let checked = './assets/img/checkbox-assignee-checked.svg';
    let unchecked = './assets/img/checkbox-assignee-unchecked.svg';

    if (checkbox.src.indexOf("unchecked") >= 0) {
        checkbox.src = checked;
    } else {
        checkbox.src = unchecked;
    }
}


// Prio Section //


/**
 * Sets the priority for the task
 * @param {number} index Index of the clicked button
 */
function setPrio(index) {
    let btns = document.getElementsByClassName("prio-btn");

    for (let i = 0; i < btns.length; i++) {
        let btn = btns[2 - i];
        let id = prio[i]['name'].toLowerCase() + '-btn-img';
        let img = document.getElementById(id);
        let color = prio[i]['color'];
        let signWhite = prio[i]['sign-white'];
        let signColor = prio[i]['sign-color'];

        if (index === i) {
            btn.style.backgroundColor = color;
            btn.style.color = 'white';
            img.src = signWhite;
            currentPrio = index;
            validationForField(5, currentPrio + 1);
        }
        else {
            btn.style.backgroundColor = '#FFFFFF';
            btn.style.color = 'black';
            img.src = signColor;
        }
    }
}


// Subtask Function //


/**
 * Adds a subtask to the list
 * @param {string} input The subtask input field 
 * @param {string} buttons The subtask buttons
 * @param {string} icon The subtask plus button
 */
function addSubtask(input, buttons, icon) {
    let inputSubtask = document.getElementById(input);
    if (inputSubtask.value.length >= 1) {
        currentSubtasks.push(
            {
                "title": inputSubtask.value,
                "status": false
            });
        inputSubtask.value = '';
        hideInputField(input, buttons, icon);
    }
    renderSubtasks();
}


/**
 * Renders the subtask list
 */
function renderSubtasks() {
    list = document.getElementById('subtask-list');
    list.innerHTML = '';
    for (let i = 0; i < currentSubtasks.length; i++) {
        let subtask = currentSubtasks[i]['title'];
        list.innerHTML += subTaskHTML(subtask, i);
    }
}


/**
 * Deletes a subtask from the list
 * @param {number} i Index of the subtask
 */
function deleteSubtask(i) {
    currentSubtasks.splice(i, 1);
    renderSubtasks();
}


/**
 * 
 * Adds a subtask to the editor on [Enter]
 * @param {event} e The key event
 * @param {string} input The subtask input field 
 */
function enterFunctionSubtasks(e, input) {
    if (e.code == "Enter") {
        let inputSubtask = document.getElementById(input);
        if (inputSubtask.value.length >= 1) {
            currentSubtasks.push(
                {
                    "title": inputSubtask.value,
                    "status": false
                });
            inputSubtask.value = '';
        }
        renderSubtasks();
    }
}


// Create Task //


/**
 * Creates a new task
 */
function createNewTask() {
    getDataForNewTask();
}


/**
 * Collects data from the add task sheet
 */
function getDataForNewTask() {
    let title = document.getElementById('title');
    let desc = document.getElementById('description');
    let date = document.getElementById('date-input');
    let assigneesMail = emailOfCurrentAssignee();

    if (submitValidation(title, desc, date, assigneesMail)) {
        addNewTask(title, desc, date, assigneesMail);
        showPopup('task-popup-btn');
        directsToBoard();
    }
}


/**
 * Returns the email addresses from selected assignees in an array
 * @returns {array} Array of selected assignees
 */
function emailOfCurrentAssignee() {
    let assigneesMail = [];
    for (let i = 0; i < currentAssignees.length; i++) {
        assigneesMail.push(currentAssignees[i]['email']);
    }
    return assigneesMail;
}


/**
 * Creates a new task and saves it on the server
 * @param {string} title Title of the task
 * @param {string} desc Description of the task
 * @param {string} date Due date of the task
 * @param {array} assigneesMail Array with the emails of the assignees
 */
async function addNewTask(title, desc, date, assigneesMail) {

    let newTask = {

        "title": title.value,
        "desc": desc.value,
        "cat": currentCategory,
        "date": date.value,
        "prio": currentPrio,
        "assignees": Array.from(assigneesMail),
        "subtasks": Array.from(currentSubtasks)
    };

    await saveOnServer('categories', categories);
    tasks[0].push(newTask);
    await saveOnServer('tasks', tasks);
}


/**
 * Directs from add task site to the board site
 */
function directsToBoard() {
    let url = window.location.pathname;
    if (url.indexOf('board') > -1) {
        setTimeout(renderNewTask, 2000);
    } else {
        setTimeout(function () {
            window.location.href = "board.html";
        }, 2000)
    }
}
