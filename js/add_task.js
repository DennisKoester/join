let currentPrio = '';
let currentCategory = '';
let currentCategoryColor = '';
let currentSubtasks = [];
let currentAssignees = [];


async function initAddTask() {

    await init();
    await loadCategories();

}


window.addEventListener("load", function () {
    // do things after the DOM loads fully
    console.log("Everything is loaded");
});


function setPrio(index) {
    let btns = document.getElementsByClassName("prio-btn");

    for (let i = 0; i < btns.length; i++) {
        let btn = btns[2 - i];
        let id = prio[i]['name'].toLocaleLowerCase() + '-btn-img';
        let img = document.getElementById(id);
        let color = prio[i]['color'];
        let signWhite = prio[i]['sign-white'];
        let signColor = prio[i]['sign-color'];

        if (index === i) {
            btn.style.backgroundColor = color;
            btn.style.color = 'white';
            img.src = signWhite;
            currentPrio = index;
        }
        else {
            btn.style.backgroundColor = '#FFFFFF';
            btn.style.color = 'black';
            img.src = signColor;
        }
    }
}


// Help Functions //

function toggleClassList(id, classList,) {
    document.getElementById(id).classList.toggle(classList);
    // document.body.classList.toggle("overlay");
}


function toggleDropdown(dropdown, icon) {
    toggleClassList(dropdown, 'd-none');
    toggleClassList(icon, 'rotate180');
}


// function dropDownToggle(id, icon) {
//     toggleClassList(id, 'd-none');
//     toggleClassList(icon, 'rotate180');
// }


// Input Fields//

function showInputField(inputContainer, container, dropdown, icon) {
    toggleClassList(inputContainer, 'd-none');
    toggleClassList(container, 'd-none');
    toggleDropdown(dropdown, icon);
    if (inputContainer == 'category-input-container')
        toggleClassList('category-colors', 'd-none');
}


function hideInputField(input, inputContainer, container) {
    document.getElementById(input).value = '';
    toggleClassList(inputContainer, 'd-none');
    toggleClassList(container, 'd-none');
    if (inputContainer == 'category-input-container')
        toggleClassList('category-colors', 'd-none');
    resetActiveColor();
}


function showInputBtns(btns, icon) {
    document.getElementById(btns).classList.remove('d-none');
    document.getElementById(icon).classList.add('d-none');
}


// Category //

function addNewCategory(input, container, dropdown) {
    let catInput = document.getElementById(input);
    if (catInput.value.length > 0 && currentCategoryColor) {
        pushCategory(catInput, currentCategoryColor);
        selectCategory(catInput.value, currentCategoryColor);
        loadCategories();
        hideInputField(input, container, dropdown);
        resetActiveColor();
        currentCategoryColor = '';
    }
}


function pushCategory(catInput, currentCategoryColor) {
    categories.push({ "name": catInput.value, "color": currentCategoryColor });
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


function addNewColorToCategory(color, id) {
    currentCategoryColor = color;

    toggleActiveColor(id)
}


function selectCategory(category, color) {
    let field = document.getElementById('selected-category');
    let dropdown = document.getElementById('category-dropdown');
    field.innerHTML = '';
    field.innerHTML = selectedCategoryHTML(category, color);
    if (!dropdown.classList.contains('d-none'))
        toggleDropdown('category-dropdown', 'triangle1');
    currentCategory = category;
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


// Assign //

function inviteContact(input, container, dropdown) {
    let assignInput = document.getElementById(input);
    let user = users.find(element => element['email'] == assignInput.value);
    let assignedUser = currentAssignees.find(element => element['email'] == assignInput.value);

    if (user && !assignedUser) {
        currentAssignees.push(user);
        assignInput.value = '';
        renderAssignees();
        hideInputField(input, container, dropdown);

        console.log(currentAssignees);
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

    console.log(currentAssignees);
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


// Date //

function getDate() {
    let input = document.getElementById('date-input');
    let date = new Date(input.value);
    // console.log (date.toLocaleDateString('de-DE')); 
}


// Subtask Function //

function addSubtask(input, container, dropdown) {
    let inputSubtask = document.getElementById('subtask-input');
    if (inputSubtask.value.length >= 1) {
        currentSubtasks.push(inputSubtask.value);
        inputSubtask.value = '';
        hideInputField(input, container, dropdown);
    }
    renderSubtasks();
}


function renderSubtasks() {
    list = document.getElementById('subtask-list');
    list.innerHTML = '';
    for (let i = 0; i < currentSubtasks.length; i++) {
        let subtask = currentSubtasks[i];
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
    // showAddedTaskPopup();
    // clearAllAddTaskData();
}


function getDataForNewTask() {
    let title = document.getElementById('title');
    let desc = document.getElementById('description');
    let cat = currentCategory;
    let date = document.getElementById('date-input');
    let prio = currentPrio;
    let assignee = [emailOfCurrentAssignee()];
    let subtask = [subtaskLoop()];
    let assignees = currentSubtasks;
    let subtasks = currentSubtasks;

    handleSubmit(title, desc, cat, date, assignee, prio);
    // addNewTask(title, desc, cat, date, prio, assignee, subtask);
}


function emailOfCurrentAssignee() {
    for (let i = 0; i < currentAssignees.length; i++) {
        let assignee = currentAssignees[i]['email'];

        return assignee;
    }
}


function subtaskLoop() {
    for (let i = 0; i < currentSubtasks.length; i++) {
        let subtask = currentSubtasks[i];

        return subtask;
    }
}


function addNewTask(title, desc, cat, date, prio, assignee, subtask) {

    /*  let newTask = {
 
         title: title.value,
         desc: desc.value,
         cat: cat,
         date: date.value,
         prio: prio,
         subtasks['title']: subtask,
         subtasks['status']: false,
         assignees: [assignee]
     }; */


    tasks.push(newTask);
    backend.setItem('tasks', JSON.stringify(tasks));

    currentPrio = '';
    currentCategory = '';
    currentCategoryColor = '';
    currentSubtasks = [];
    currentAssignees = [];
}



function showAddedTaskPopup() {
    let popup = document.getElementById('added-popup');
    popup.classList.add('transition');
    setTimeout(function () {
        popup.classList.remove('transition');
    }, 1500);
}


function clearAllAddTaskData() {
    currentPrio = '';
    currentCategory = '';
    currentCategoryColor = '';
    currentSubtasks = [];
    currentAssignees = [];
}


function handleSubmit(title, desc, cat, date, assignee, prio) {

    let allData = [title.value, desc.value, cat, assignee, date.value, prio];

    for (let i = 0; i < allData.length; i++) {
        const value = allData[i];
        let required = document.getElementById(`required${i}`);

        if (allData[i] == 0) {
            required.classList.remove('hidden');
        } else {
            required.classList.add('hidden');
        }
    }
}





/* var today = new Date();
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
document.getElementById("date-input").setAttribute("min", today); */


// document.getElementById('date-input').min = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().split("T")[0];




/* function checkSelectionSubtask(i) {
    let subtaskCheck = document.getElementById(`subtask${i}`);
    if (subtaskCheck.checked) {
        console.log("Checked");
    } else {
        console.log("Not checked");
    }
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








