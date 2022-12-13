function assigneeHTML(assignee) {
    return /*html*/ `
        <li>
            <label class="flex-btw">
                <div>${assignee}</div>
                <input id="${assignee}" class="checkbox" type="checkbox" id="assignee" name="assignee" value="" checked>
            </label>
        </li>`
}


function inviteContactHTML() {
    return /*html*/ `
    <li onclick="showInputField('assign-input-container', 'assign-dropdown-container', 'assign-dropdown', 'triangle2')">
        <label class="flex-btw">
            <div>Invite new contact</div>
             <img src="./assets/img/contact-icon.svg" alt="">
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
        <input onclick="checkSelectionSubtask(${i})" type="checkbox" id="subtask${i}" name="subtask" value="subtask">
        <label for="">${subtask}</label>
        <img onclick="deleteSubtask(${i})" src="./assets/img/black-x.svg" alt="" class="filter-btn">
    </div>`;
}
