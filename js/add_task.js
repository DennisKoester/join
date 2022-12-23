let currentPrio = -1;
let currentCategory = '';
let currentCategoryColor = '';
let currentSubtasks = [];
let currentAssignees = [];
let validation = false;


async function initAddTask() {

    await init();
    await loadCategories();
    await dateLimitation();
}


window.addEventListener("load", function () {
    // do things after the DOM loads fully
    console.log("Everything is loaded");
});


// Help Functions //

/**
 * 
 * @param {number} id The ID of the element
 * @param {object} classList The classlist which will be toggled
 */
function toggleClassList(id, classList,) {
    document.getElementById(id).classList.toggle(classList);
    // document.body.classList.toggle("overlay");
}


/**
 * 
 * @param {object} dropdown The dropdown container
 * @param {object} icon The triangle icon
 */
function toggleDropdown(dropdown, icon) {
    toggleClassList(dropdown, 'd-none');
    toggleClassList(icon, 'rotate180');
}


// Input Fields//

/**
 * 
 * @param {object} inputContainer The input container
 * @param {object} container The dropdown container
 * @param {object} dropdown The dropdown itself
 * @param {object} icon The triangle icon
 */
function showInputField(inputContainer, container, dropdown, icon) {
    toggleClassList(inputContainer, 'd-none');
    toggleClassList(container, 'd-none');
    toggleDropdown(dropdown, icon);
    if (inputContainer == 'category-input-container')
        toggleClassList('category-colors', 'd-none');
}


/**
 * 
 * @param {object} input The input field
 * @param {object} inputContainer The input container
 * @param {object} container The dropwdown container
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
 * 
 * @param {object} btns The Buttons from the input fields
 * @param {object} icon The triangle icon
 */
function showInputBtns(btns, icon) {
    document.getElementById(btns).classList.remove('d-none');
    document.getElementById(icon).classList.add('d-none');
}


// Category Section //

/**
 * 
 * @param {object} input The input field
 * @param {object} container The category container
 * @param {object} dropdown The category dropdown menu
 */
function addNewCategory(input, container, dropdown) {
    let catInput = document.getElementById(input);
    if (catInput.value.length > 0 && currentCategoryColor) {
        pushCategory(catInput.value, currentCategoryColor);
        selectCategory(catInput.value, currentCategoryColor);
        hideInputField(input, container, dropdown);
        loadCategories();
        resetActiveColor();
        currentCategoryColor = '';
    }
}


/**
 * 
 * @param {object} catInput The category input field
 * @param {object} currentCategoryColor The current category color
 */
function pushCategory(catInput, currentCategoryColor) {

    let newCategory =

    {
        "name": catInput,
        "color": currentCategoryColor
    }

    categories.push(newCategory);
    backend.setItem('categories', JSON.stringify(categories));

}


async function loadCategories() {
    let list = document.getElementById('category-list');
    list.innerHTML = '';
    for (let i = 0; i < categories.length; i++) {
        let category = categories[i]['name'];
        let color = categories[i]['color'];
        list.innerHTML += categoryHTML(category, color);
    }
    list.innerHTML += addCategoryHTML();
}


function selectCategory(category, color) {
    let field = document.getElementById('selected-category');
    let dropdown = document.getElementById('category-dropdown');
    field.innerHTML = '';
    field.innerHTML = selectedCategoryHTML(category, color);
    if (!dropdown.classList.contains('d-none'))
        toggleDropdown('category-dropdown', 'triangle1');
    currentCategory = category;
    validationForField(2, currentCategory);
}


function addNewColorToCategory(color, id) {
    currentCategoryColor = color;
    toggleActiveColor(id);
}


function toggleActiveColor(id) {
    let btns = document.querySelectorAll("#category-colors .color-dot");

    for (let i = 0; i < btns.length; i++) {
        btns[i].classList.remove('active');
    }
    toggleClassList(`color${id}`, 'active');
}


function resetActiveColor() {
    let btns = document.querySelectorAll("#category-colors .color-dot");

    for (let i = 0; i < btns.length; i++) {
        btns[i].classList.remove('active');
    }
}


// Assignee Section //

function inviteContact(input, container, dropdown) {
    let assignInput = document.getElementById(input);
    let user = users.find(element => element['email'] == assignInput.value);
    let assignedUser = currentAssignees.find(element => element['email'] == assignInput.value);

    if (user && !assignedUser) {
        currentAssignees.push(user);
        assignInput.value = '';
        renderAssignees();
        hideInputField(input, container, dropdown);
        validationForField(3, currentAssignees);
    }
}


function renderAssignees() {
    let list = document.getElementById('assignee-list');
    let badgeList = document.getElementById('add-task-assignees');
    list.innerHTML = '';
    badgeList.innerHTML = '';

    for (let i = 0; i < currentAssignees.length; i++) {
        let assignee = currentAssignees[i]['name'];
        list.innerHTML += assigneeHTML(i, assignee);
    }
    showAssigneeBadge();
    list.innerHTML += inviteContactHTML();
}


function showAssigneeBadge() {
    let badgeList = document.getElementById('add-task-assignees');
    badgeList.innerHTML = '';

    for (let i = 0; i < currentAssignees.length; i++) {
        let initials = currentAssignees[i]['short_name'];
        let color = currentAssignees[i]['color'];
        badgeList.innerHTML += assigneeBadgeHTML(initials, color);
    }
}


function selectAssignee(i, assignee) {
    let user = currentAssignees.find(element => element['name'] == assignee);

    if (!user) {
        let user = users.find(element => element['name'] == assignee);
        currentAssignees.push(user);
    } else {
        let index = currentAssignees.findIndex(element => element['name'] == assignee);
        currentAssignees.splice(index, 1);
    }
    changeCheckbox(i);
    showAssigneeBadge();
    validationForField(3, currentAssignees);
}


function changeCheckbox(i) {
    let checkbox = document.getElementById(`checkbox${i}`);
    let checked = './assets/img/checkbox-assignee-checked.svg';
    let unchecked = './assets/img/checkbox-assignee-unchecked.svg';

    if (checkbox.src.indexOf("unchecked") >= 0) { // TODO Why !== -1 ?? IndexOf gives "-1" back when nothing is found.
        checkbox.src = checked;
    } else {
        checkbox.src = unchecked;
    }
}


// Prio Section //

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

function addSubtask(input, container, dropdown) {
    let inputSubtask = document.getElementById('subtask-input');
    if (inputSubtask.value.length >= 1) {
        currentSubtasks.push(
            {
                "title": inputSubtask.value,
                "status": false
            });
        inputSubtask.value = '';
        hideInputField(input, container, dropdown);
    }
    renderSubtasks();
}


function renderSubtasks() {
    list = document.getElementById('subtask-list');
    list.innerHTML = '';
    for (let i = 0; i < currentSubtasks.length; i++) {
        let subtask = currentSubtasks[i]['title'];
        list.innerHTML += subTaskHTML(subtask, i);
    }
}


function deleteSubtask(i) {
    currentSubtasks.splice(i, 1);
    renderSubtasks();
}


// Create Task //

function createNewTask() {
    getDataForNewTask();
}


function getDataForNewTask() {
    let title = document.getElementById('title');
    let desc = document.getElementById('description');
    let date = document.getElementById('date-input');
    let assigneesMail = emailOfCurrentAssignee();


    submitValidation(title, desc, date, assigneesMail);
    if (validation == true) {
        addNewTask(title, desc, date, assigneesMail);
        showAddedTaskPopup();
        // directsToBoard();
    }
}


function emailOfCurrentAssignee() {
    let assigneesMail = [];
    for (let i = 0; i < currentAssignees.length; i++) {
        assigneesMail.push(currentAssignees[i]['email']);
    }
    return assigneesMail;
}


function addNewTask(title, desc, date, assigneesMail) {

    let newTask = {

        "title": title.value,
        "desc": desc.value,
        "cat": currentCategory,
        "date": date.value,
        "prio": currentPrio,
        "assignees": Array.from(assigneesMail),
        "subtasks": Array.from(currentSubtasks)
    };

    tasks[0].push(newTask);
    backend.setItem('tasks', JSON.stringify(tasks));
}


function resetAddTask() {
    clearAllInputs();
    loadCategories();
    renderAssignees();
    resetActiveColor();
    setPrio();
    renderSubtasks();
    resetValidation();
}

function clearAllInputs() {
    let title = document.getElementById('title');
    let desc = document.getElementById('description');
    let date = document.getElementById('date-input');
    let cat = document.getElementById('selected-category');
    let catInput = document.getElementById('category-input');
    let assignee = document.getElementById('assign-input');
    let subtask = document.getElementById('subtask-input');

    cat.innerHTML = 'Select task category';
    title.value = '';
    desc.value = '';
    date.value = '';
    assignee.value = '';
    catInput.value = '';
    subtask.value = '';
    currentPrio = -1;
    currentAssignees = [];
    currentCategory = [];
    currentCategoryColor = '';
    currentSubtasks = [];
}


// Validation //

function submitValidation() {
    let title = document.getElementById('title');
    let desc = document.getElementById('description');
    let date = document.getElementById('date-input');
    let assigneesMail = emailOfCurrentAssignee();

    let allData = [title.value, desc.value, currentCategory, assigneesMail, date.value, currentPrio + 1];

    for (let i = 0; i < allData.length; i++) {
        const value = allData[i];
        let required = document.getElementById(`required${i}`);

        if (value == 0) {
            required.classList.remove('hidden');
        } else {
            required.classList.add('hidden');
        }
    }
    finalValidation();
}


function finalValidation() {
    let elementIds = ['required0', 'required1', 'required2', 'required3', 'required4', 'required5'];
    let className = 'hidden';
    let hasClassResults = hasClass(elementIds, className);
    if (!hasClassResults.includes(false)) {
        validation = true;
    } else {
        validation = false;
    }
    console.log(hasClassResults);  // [true, false, false]
    console.log(validation);
}


function hasClass(elementIds, className) {
    return elementIds.map(id => {
        let element = document.getElementById(id);
        return element.classList.contains(className);
    });
}


function validationForField(id, input) {
    let required = document.getElementById(`required${id}`);

    if (input == 0) {
        required.classList.remove('hidden');
    } else {
        required.classList.add('hidden');
    }
}


function validationForInput(id, input) {
    let required = document.getElementById(`required${id}`);
    let value = document.getElementById(input).value;

    if (value == 0) {
        required.classList.remove('hidden');
    } else {
        required.classList.add('hidden');
    }
}


function resetValidation() {

    for (let i = 0; i < 6; i++) {
        let text = document.getElementById(`required${i}`);
        text.classList.add('hidden');
    }
}


function dateLimitation() {

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }

    today = yyyy + '-' + mm + '-' + dd;
    document.getElementById("date-input").setAttribute("min", today);
}


function showAddedTaskPopup() {
    let popup = document.getElementById('popup-btn');

    popup.classList.add('animation');
    setTimeout(function () {
        removeAnimate(popup);
    }, 3000);
}


function removeAnimate(popup) {
    popup.classList.remove('animation');
}


function directsToBoard() {
    setTimeout(function () {
        window.location.href = "board.html";
    }, 2000)
}



/* function showAddedTaskPopup() {
    let popup = document.querySelector('.added-popup');
    popup.animate([
        0 % {
            bottom: '15%',
            opacity: 0
        },

        30 % {
            bottom: '40%',
            opacity: 1
        },

        100 % {
            bottom: '40%',
            opacity: 1
        }

    ], {
        duration: 1500
    });
} */


/*  Hide Dropdown By Clicking Next To It //

function toggleDropdown(id, icon) {
    toggleClassList(id, icon, 'd-none', 'rotate180');
    window.addEventListener('click', function handleClickOutsideBox(event) {
        let area = document.getElementById(id);
        if (!area.contains(event.target))
        document.getElementById(id).classList.add('d-none');
    })
}; */








