// Category Section //


/** 
 * Renders "New Category" in the list
 * @returns HTML
 */
function addCategoryHTML() {
    return /*html*/ `
        <li onclick="showInputField('category-input-container', 'category-dropdown-container', 'category-dropdown', 'triangle1')">
            <div>New Category</div>
        </li>`
}


/**
 * Renders selected category
 * @param {string} category The category name
 * @param {string} color The category color
 * @returns HTML
 */
function selectedCategoryHTML(category, color) {
    return /*html*/ `
        <div>${escapeHTML(category)}</div><div class="color-dot ${color}" style="margin-left: 10px;">`
}


/**
 * Renders every single category in the list
 * @param {string} category The category name
 * @param {string} color The category color
 * @returns HTML
 */
function categoryHTML(category, color) {
    return /*html*/ `
        <li onclick="selectCategory('${escapeHTML(category)}', '${color}')">
            <div>${escapeHTML(category)}</div>
            <div class="color-dot ${color}"></div>
        </li>`
}


// Assignee Section //


/**
 * Renders every single assignee in the list
 * @param {number} i Index of the assignee
 * @param {string} assignee The name of the assignee
 * @returns HTML
 */
function assigneeHTML(i, assignee) {
    return /*html*/ `
        <li onclick="selectAssignee(${i})">
            <label class="flex-btw">
                <div>${escapeHTML(assignee)}</div>
                <img id="checkbox${i}" class="checkbox" src="./assets/img/checkbox-assignee-unchecked.svg" alt="checkbox">
            </label>
        </li>`
}


/**
 * Renders the badge of the selected assignee
 * @param {string} initials The initials of the assignee
 * @param {string} color The color of the user
 * @returns HTML
 */
function assigneeBadgeHTML(initials, color) {
    return /*html*/ `
    <div class="add-task-assignee" style="background-color: ${color}">${initials}</div>`
}


/**
 * Renders the subtask in the list
 * @param {string} subtask The subtask
 * @param {number} i Index of the subtask
 * @returns HTML
 */
function subTaskHTML(subtask, i) {
    return /*html*/ `
    <div class="subtask">
        <img src="./assets/img/checkbox-unchecked.svg" alt="checkbox">
        <label for="">${escapeHTML(subtask)}</label>
        <img onclick="deleteSubtask(${i})" src="./assets/img/black-x.svg" alt="" class="filter-btn">
    </div>`;
}
