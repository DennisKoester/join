// Validation //


/**
 * Validates the complete add task sheet
 * @returns {boolean} 
 */
function submitValidation() {
    let title = document.getElementById('title');
    let desc = document.getElementById('description');
    let date = document.getElementById('date-input');
    let assigneesMail = emailOfCurrentAssignee();
    let validation = true;

    let allData = [title.value, desc.value, currentCategory, assigneesMail, date.value, currentPrio + 1];

    for (let i = 0; i < allData.length; i++) {
        const value = allData[i];
        let required = document.getElementById(`required${i}`);
        if (value == 0) {
            required.classList.remove('hidden');
            validation = false;
        } else {
            required.classList.add('hidden');
        }
    }
    return validation;
}


/**
 * Live validation for a field where the selection got pushed
 * @param {number} id Index of the required text field
 * @param {string} input Specific field
 */
function validationForField(id, input) {
    let required = document.getElementById(`required${id}`);

    if (input == 0) {
        required.classList.remove('hidden');
    } else {
        required.classList.add('hidden');
    }
}


/**
 * Live validation for an input field
 * @param {number} id Index of the required text field
 * @param {string} input Specific input field
 */
function validationForInput(id, input) {
    let required = document.getElementById(`required${id}`);
    let value = document.getElementById(input).value;

    if (value == 0) {
        required.classList.remove('hidden');
    } else {
        required.classList.add('hidden');
    }
}


/**
 * Resets the complete validation 
 */
function resetValidation() {

    for (let i = 0; i < 6; i++) {
        let text = document.getElementById(`required${i}`);
        text.classList.add('hidden');
    }
}


/**
 * Limits the date to present day
 */
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


// Category Section //


/**
 * Adds a new category to the selection
 * @param {string} input The input field
 * @param {string} container The category container
 * @param {string} dropdown The category dropdown menu
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
 * Pushes a new category to the selection on the server
 * @param {string} catInput The category input field
 * @param {string} currentCategoryColor The current category color
 */
async function pushCategory(catInput, currentCategoryColor) {

    let newCategory =

    {
        "name": catInput,
        "color": currentCategoryColor
    }
    categories.push(newCategory);
}


/**
 * Loads all categories from the server inside the selection
 */
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


/**
 * Selects a category for the task and validates the field
 * @param {string} category Clicked category
 * @param {string} color Belonging color of the category
 */
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


/**
 * Adds a new color to the category which will be added
 * @param {string} color The selected color
 * @param {number} id The ID of the selected color
 */
function addNewColorToCategory(color, id) {
    currentCategoryColor = color;
    toggleActiveColor(id);
}


/**
 * Toggles the active color selection
 * @param {number} id The ID of the selected color
 */
function toggleActiveColor(id) {
    let btns = document.querySelectorAll("#category-colors .color-dot");

    for (let i = 0; i < btns.length; i++) {
        btns[i].classList.remove('active');
    }
    toggleClassList(`color${id}`, 'active');
}


/**
 * Resets the active color
 */
function resetActiveColor() {
    let btns = document.querySelectorAll("#category-colors .color-dot");

    for (let i = 0; i < btns.length; i++) {
        btns[i].classList.remove('active');
    }
}