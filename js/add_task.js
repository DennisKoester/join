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

/* function dropDownToggle(box, id) {
    toggleClassList(id, 'd-none');
    document.addEventListener('click', function handleClickOutsideBox(event) {
        let area = document.getElementById(`${box}`);
        if (!area.contains(event.target))
            addClassList(`${id}`, 'd-none')
    })
};

 */


// Input Fields//

function showInputField(input, container, dropdown, icon) {
    document.getElementById(input).classList.remove('d-none');
    document.getElementById(container).classList.add('d-none');
    toggleClassList(dropdown, icon, 'open', 'rotate180');
    // input.classList.remove('d-none');
    // dropdown.classList.add('d-none'); // TODO Why is that not working?!
}


function hideInputField(input, container, dropdown) {
    document.getElementById(input).value = '';
    document.getElementById(container).classList.add('d-none');
    document.getElementById(dropdown).classList.remove('d-none');
    if (input == 'category-input')
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

// function addNewColorToCategory(){
//     let input = document.getElementById('category-input').value;
//     let newCategory = document.getElementById('category-dropdown-container');
//     newCategory = /*html*/ `
//     <span>${input}</span>
//     <div class="dot lightblue"></div>
//     `

// }


// Assign //

function inviteContact(input, container, dropdown) {
    let assignee = document.getElementById(input);
    if (assignee.value.length >= 0) {
        assignees.push(assignee.value)
        input.value = '';
        showAssigneBadge(assignee);
    }
    renderAssignees();
    hideInputField(input, container, dropdown);
}

function renderAssignees() {
    let list = document.getElementById('assign-dropdown');
    list.innerHTML = '';
    for (let i = 0; i < assignees.length; i++) {
        const assignee = assignees[i];
        list.innerHTML += assigneeHTML(i, assignee);
    }
    list.innerHTML += inviteContactHTML();
}

function showAssigneBadge(assignee){
    let initial = assignee.value;
    let list = document.getElementById('add-task-assignees');
    list.innerHTML += assigneeBadgeHTML(initial);
}



