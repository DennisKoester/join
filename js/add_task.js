let currentPrio;
let currentCategory;
let currentCategoryColor = false;
let currentSubtasks = [];
let currentAssignees = [];


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


// Help Functions //

function toggleClassList(id, classList,) {
    document.getElementById(id).classList.toggle(classList);
    // document.body.classList.toggle("overlay");
}


function dropDownToggle(id, icon) {
    toggleClassList(id, 'd-none');
    toggleClassList(icon, 'rotate180');
}



//  Hide Dropdown By Clicking Next To It //

// function dropDownToggle(id, icon) {
//     toggleClassList(id, icon, 'd-none', 'rotate180');
//     window.addEventListener('click', function handleClickOutsideBox(event) {
//         let area = document.getElementById(id);
//         if (!area.contains(event.target))
//         document.getElementById(id).classList.add('d-none');
//     })
// };



// Title Field //

/* function getDataForNewTask() {
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
} */




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

}


function toggleDropdown(dropdown, icon) {
    toggleClassList(dropdown, 'd-none');
    toggleClassList(icon, 'rotate180');
}



function showInputBtns(btns, icon) {
    document.getElementById(btns).classList.remove('d-none');
    document.getElementById(icon).classList.add('d-none');
}


// Category //

function addNewCategory(input, container, dropdown) {
    let catInput = document.getElementById(input);
    if (catInput.value.length > 0 && currentCategoryColor !== false) {
        pushCategory(catInput, currentCategoryColor);
        selectCategory(catInput.value, currentCategoryColor);
        loadCategories();
        hideInputField(input, container, dropdown);
        resetActiveColor();
        currentCategoryColor = false; // TODO Is that the right way????
    }
}


function pushCategory(catInput, currentCategoryColor) {
    categories.push({ "name": catInput.value, "color": currentCategoryColor });
}


function loadCategories() {
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
}


function toggleActiveColor(id) {
    let btnContainer = document.getElementById("category-colors");
    let btns = btnContainer.getElementsByClassName("color-dot");

    for (let i = 0; i < btns.length; i++) {
        btns[i].classList.remove('active');
    }
    toggleClassList(`color${id}`, 'active');
}


function resetActiveColor() {
    let btnContainer = document.getElementById("category-colors");
    let btns = btnContainer.getElementsByClassName("color-dot");

    for (let i = 0; i < btns.length; i++) {
        btns[i].classList.remove('active');
    }
}



// Assign //

function inviteContact(input, container, dropdown) {
    // let required = document.getElementById('required-assign');

    let assignee = document.getElementById(input);
    if (assignee.value.includes('@')) {
        users.push({ "name": assignee.value })
        input.value = '';
        loadAssignees();
        showAssigneBadge(assignee);
        hideInputField(input, container, dropdown);

    } else {

    }
}


function loadAssignees() {
    let list = document.getElementById('assignee-list');

    list.innerHTML = '';
    for (let i = 0; i < users.length; i++) {
        const assignee = users[i]['name'];
        list.innerHTML += assigneeHTML(assignee, i);
        showAssigneBadge(i, assignee)
    }
    list.innerHTML += inviteContactHTML();
}


function showAssigneBadge(i) {
    let badgeList = document.getElementById('add-task-assignees');
    let initials = getInitials(i)

    badgeList.innerHTML += assigneeBadgeHTML(initials);
}


function getInitials(i) {
    const fullName = users[i]['name'].split(' ');
    const initials = fullName.shift().charAt(0) + fullName.pop().charAt(0);
    console.log(initials)
    return initials.toUpperCase();

}


function selectAssignee(i) {
    let checkbox = document.getElementById(`checkbox${i}`);
    let checked = './assets/img/checkbox-assignee-checked.svg';
    let unchecked = './assets/img/checkbox-assignee-unchecked.svg';

    if (checkbox.src.indexOf("unchecked") != -1) { // TODO Why != -1 ??
        checkbox.src = checked;
    } else {
        checkbox.src = unchecked;
    }
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


// Subtask Function //

function addSubtask(input, container, dropdown) {
    let inputSubtask = document.getElementById('subtask-input');
    if (inputSubtask.value.length >= 1) {
        currentSubtasks.push(inputSubtask.value);
        inputSubtask.value = '';
    }
    renderSubtasks();
    hideInputField(input, container, dropdown);
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


/* function checkSelectionSubtask(i) {
    let subtaskCheck = document.getElementById(`subtask${i}`);
    if (subtaskCheck.checked) {
        console.log("Checked");
    } else {
        console.log("Not checked");
    }
} */