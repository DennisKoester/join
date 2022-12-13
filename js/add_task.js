let currentPrio;
let currentCategory;
let currentSubtasks = [];
let currentAssignees = [];


let subtasks = [];
let assignees = [];


function prioUrgent() {
    let btn = document.getElementById('urgend-btn');
    let img = document.getElementById('urgent-btn-img');
    backgroundColor = btn.style.backgroundColor;

    if (backgroundColor == 'rgb(255, 255, 255)') {
        btn.style.backgroundColor = '#FF3D00';
        btn.style.color = 'white';
        img.src = "./assets/img/urgent-white.svg"
    } else {
        btn.style.backgroundColor = '#FFFFFF';
        btn.style.color = 'black';
        img.src = "./assets/img/urgent.svg"
    }
};


function prioMedium() {
    let btn = document.getElementById('medium-btn');
    let img = document.getElementById('medium-btn-img');
    backgroundColor = btn.style.backgroundColor;

    if (backgroundColor == 'rgb(255, 255, 255)') {
        btn.style.backgroundColor = '#FFA800';
        btn.style.color = 'white';
        img.src = "./assets/img/medium-white.svg"
    } else {
        btn.style.backgroundColor = '#FFFFFF';
        btn.style.color = 'black';
        img.src = "./assets/img/medium.svg"
    }
};


function prioLow() {
    const btn = document.getElementById('low-btn');
    let img = document.getElementById('low-btn-img');
    backgroundColor = btn.style.backgroundColor;

    if (backgroundColor == 'rgb(255, 255, 255)') {
        btn.style.backgroundColor = '#7AE229';
        btn.style.color = 'white';
        img.src = "./assets/img/low-white.svg"
    } else {
        btn.style.backgroundColor = '#FFFFFF';
        btn.style.color = 'black';
        img.src = "./assets/img/low.svg"
    }
};


function toggleClassList(id, icon, classList, classList1) {
    document.getElementById(id).classList.toggle(classList);
    document.getElementById(icon).classList.toggle(classList1);
    // document.body.classList.toggle("overlay");
}


function dropDownToggle(id, icon) {
    toggleClassList(id, icon, 'open', 'rotate180');
}



//  Hide Dropdown By Clicking Next To It //

// function dropDownToggle(id, icon) {
//     toggleClassList(id, icon, 'open', 'rotate180');
//     window.addEventListener('click', function handleClickOutsideBox(event) {
//         let area = document.getElementById(id);
//         if (!area.contains(event.target))
//         document.getElementById(id).classList.add('d-none');
//     })
// };



// Title Field //

function getDataForNewTask() {
    let title = document.getElementById('title');
    let desc = document.getElementById('description');
    let cat = currentCategory;
    let assignees = currentAssignees;
    let date = document.getElementById('date-input');
    let prio = currentPrio;
    console.log(title.value, desc.value, cat, assignees, date.value, prio)
}


function addNewTask() {
    let tasks = { title: title.value, }
}




// Input Fields//

function showInputField(hiddenContainer, container, dropdown, icon) {
    document.getElementById(hiddenContainer).classList.remove('d-none');
    document.getElementById(container).classList.add('d-none');
    toggleClassList(dropdown, icon, 'open', 'rotate180');
    if (hiddenContainer == 'category-input-container')
        toggleColorSelection();
}


function hideInputField(input, hiddenContainer, container) {
    document.getElementById(input).value = '';
    document.getElementById(hiddenContainer).classList.add('d-none');
    document.getElementById(container).classList.remove('d-none');
    if (hiddenContainer == 'category-input-container')
        toggleColorSelection();
}


function showInputBtns(btns, icon) {
    document.getElementById(btns).classList.remove('d-none');
    document.getElementById(icon).classList.add('d-none');
}


// Subtask Function //

function addSubtask(input, container, dropdown) {
    let inputSubtask = document.getElementById('subtask-input');
    if (inputSubtask.value.length >= 1) {
        subtasks.push(inputSubtask.value);
        inputSubtask.value = '';
    }
    renderSubtasks();
    hideInputField(input, container, dropdown);
}


function renderSubtasks() {
    list = document.getElementById('subtask-list');
    list.innerHTML = '';
    for (let i = 0; i < subtasks.length; i++) {
        const subtask = subtasks[i];
        list.innerHTML += subTaskHTML(subtask, i);
    }
}


function deleteSubtask(i) {
    subtasks.splice(i, 1);
    renderSubtasks();
}


function checkSelectionSubtask(i) {
    let subtaskCheck = document.getElementById(`subtask${i}`);
    if (subtaskCheck.checked) {
        console.log("Checked");
    } else {
        console.log("Not checked");
    }
}


// Category //

function toggleColorSelection() {
    let selection = document.getElementById('category-colors');
    selection.classList.toggle('d-none');
}


function addNewCategory(input, container, dropdown) {
    let catInput = document.getElementById(input);
    // let color = document.getElementById();
    if (catInput.value.length > 0) {

        categories.push(catInput.value)
        showCategory(catInput);
        catInput.value = '';
    }
    loadCategories();
    hideInputField(input, container, dropdown);
}


function loadCategories() {

    let list = document.getElementById('category-list');
    list.innerHTML = '';
    for (let i = 0; i < categories.length; i++) {
        const category = categories[i];
        list.innerHTML += categoryHTML(category);
    }
    list.innerHTML += addCategoryHTML();
}


function showCategory(category) {
    let field = document.getElementById('selected-category');
    field.innerHTML = '';
    field.innerHTML = /*html*/ `<span>${category.value}</span>`
}


function categoryHTML(category, color) {
    return /*html*/ `
        <li onclick="showCategory()">
            <div>${category}</div>
            <div class="color-dot ${color}"></div>
        </li>`
}


function addCategoryHTML() {
    return /*html*/ `
        <li onclick="showInputField('category-input-container', 'category-dropdown-container', 'category-dropdown', 'triangle1'), toggleColorSelection()">
            <div>New Category</div>
        </li>`
}


function addNewColorToCategory(id) {
    let color = id;
    console.log(color);
    return color;
}


// Assign //

function inviteContact(input, container, dropdown) {
    let assignee = document.getElementById(input);
    let required = document.getElementById('required-assign');
    if (assignee.value.length >= 1) {
        assignees.push(assignee.value)
        input.value = '';
        required.classList.add('hidden');
    } else if (assignees.length == 0) {
        required.classList.remove('hidden');
    }
    renderAssignees();
    showAssigneBadge(assignee);
    hideInputField(input, container, dropdown);
}


function renderAssignees() {
    let list = document.getElementById('assign-list');
    list.innerHTML = '';
    for (let i = 0; i < assignees.length; i++) {
        const assignee = assignees[i];
        list.innerHTML += assigneeHTML(assignee);
    }
    list.innerHTML += inviteContactHTML();
}


function showAssigneBadge(assignee) {
    let initial = assignee.value;
    let list = document.getElementById('add-task-assignees');


    list.innerHTML += assigneeBadgeHTML(initial);
}


// function setInputValues(assignee){
//     document.getElementById('assign-input').value = assignee;
// }

// Date //

function getDate() {
    let input = document.getElementById('date-input');
    let date = new Date(input.value);
    // console.log (date.toLocaleDateString('de-DE')); 
}

