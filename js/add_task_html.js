// Category Section //

function addCategoryHTML() {
    return /*html*/ `
        <li onclick="showInputField('category-input-container', 'category-dropdown-container', 'category-dropdown', 'triangle1')">
            <div>New Category</div>
        </li>`
}


function selectedCategoryHTML(category, color) {
    return /*html*/ `
        <div>${category}</div><div class="color-dot ${color}" style="margin-left: 10px;">`
}


function categoryHTML(category, color) {
    return /*html*/ `
        <li onclick="selectCategory('${category}', '${color}')">
            <div>${category}</div>
            <div class="color-dot ${color}"></div>
        </li>`
}


// Assignee Section //

function assigneeHTML(assignee, i) {
    return /*html*/ `
        <li onclick="selectAssignee(${i})">
            <label class="flex-btw">
                <div>${assignee}</div>
                <img id="checkbox${i}" class="checkbox" src="./assets/img/checkbox-assignee-checked.svg" alt="checkbox">
                <!-- <input id="${assignee}" class="checkbox" type="checkbox" id="assignee" name="assignee" value="" checked> -->
            </label>
        </li>`
}


function inviteContactHTML() {
    return /*html*/ `
    <li onclick="showInputField('assign-input-container', 'assign-dropdown-container', 'assign-dropdown', 'triangle2')">
        <label class="flex-btw">
            <div>Invite new contact</div>
             <img src="./assets/img/contact-icon.svg" alt="contact icon">
        </label>
    </li>`
}


function assigneeBadgeHTML(inital) {
    return /*html*/ `
    <div class="add-task-assignee" style="background-color: magenta">${inital}</div>`
}


function subTaskHTML(subtask, i) {
    return /*html*/ `
    <div class="subtask">
        <img src="./assets/img/checkbox-unchecked.svg" alt="checkbox">
        <!-- <input onclick="checkSelectionSubtask(${i})" type="checkbox" id="subtask${i}" name="subtask" value="subtask"> -->
        <label for="">${subtask}</label>
        <img onclick="deleteSubtask(${i})" src="./assets/img/black-x.svg" alt="" class="filter-btn">
    </div>`;
}
