// let popupOpen = false;

/**
 * The email of the contact to be edited
 */
let currentContactMail = '';

/**
 * Initiates the contact form
 */
function openContactForm() {
    resetInputs();
    setContactFormButtons();
    setBadgeContactForm();
    hideLabels();
    setTitleContactModal(true);
    toggleContactsModal();
}


/**
 * Opens the contact editor
 * @param {Number} id The id of the contact
 */
function openContactEditor(id) {
    setFormData(id);
    setBadgeEditor(id);
    setEditorButtons(id);
    hideLabels();
    setTitleContactModal(false);
    toggleContactsModal();
}


/**
 * Resets all input fields in the contact form
 */
function resetInputs() {
    const inputName = document.getElementById('username');
    const inputEmail = document.getElementById('email');
    const inputPhone = document.getElementById('phone');
    inputName.value = '';
    inputEmail.value = '';
    inputPhone.value = '';
}


/**
 * Hides the message labels in the contact form
 */
function hideLabels() {
    const nameValid = document.getElementById('name-validation');
    const mailValid = document.getElementById('mail-validation');
    nameValid.classList.add('hidden');
    mailValid.classList.add('hidden');
}


/**
 * Sets the title of the contact form for creating a new contact
 * @param {Boolean} isNewContact Flag to determin new contact
 */
function setTitleContactModal(isNewContact) {
    const title = document.getElementById('modal-contact--title');
    const subtitle = document.getElementById('modal-contact--subtitle');
    if (isNewContact) {
        title.innerHTML = "Add contact";
        subtitle.classList.remove('d-none');
    }
    else {
        title.innerHTML = "Edit contact";
        subtitle.classList.add('d-none');
    }
}


/**
 * Validates the input contact data
 */
function validateContactData(isNewContact) {
    const inputName = document.getElementById('username');
    const inputEmail = document.getElementById('email');
    let isFormValid = true;

    if (!nameValidation(inputName, 'name-validation', 'hidden')) isFormValid = false;
    if (!validateContactMail(inputEmail, isNewContact)) isFormValid = false;

    return isFormValid;
}


/**
 * Validates the input mail address and differentiates between new and edited contact
 * @param {Object} email The input field for the contact email
 * @param {Boolean} isNewContact Flag to determin whether a new contact is to be validated
 * @returns Boolean
 */
function validateContactMail(email, isNewContact) {
    if (isNewContact) {
        return validateMailInput(email);
    }
    else {
        if (email.value != currentContactMail) {
            return validateMailInput(email);
        }
        else {
            return true;
        }
    }
}


/**
 * Validates the input email address
 * @param {Object} email The input field for the contact email address
 * @returns Boolean
 */
function validateMailInput(email) {
    const validMailMsg = document.getElementById('mail-validation');
    let emailMatch = users.find(u => u.email == email.value);
    if (emailMatch) {
        validMailMsg.classList.remove('hidden');
        return false;
    }
    else {
        validMailMsg.classList.add('hidden');
        return true;
    }
}


/**
 * Saves the new contact
 */
async function saveNewContact() {
    if (!validateContactData(true)) return;

    const name = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const initials = getInitials(name);
    const color = generateColors();
    users.push({
        'name': name,
        'email': email,
        'password': '',
        'phone': phone,
        'short_name': initials,
        'color': color
    });
    await saveOnServer('users', users);
    renderContacts();
    renderContactInformation(users.length - 1);

    toggleContactsModal();
    showPopup('contact-popup-btn');
}


/**
 * Writes the contact data to the editor
 * @param {Number} id The ID of the contact
 */
function setFormData(id) {
    const inputName = document.getElementById('username');
    const inputEmail = document.getElementById('email');
    const inputPhone = document.getElementById('phone');
    inputName.value = users[id]['name'];
    inputEmail.value = users[id]['email'];
    currentContactMail = users[id]['email'];
    inputPhone.value = users[id]['phone'];
}


/**
 * Sets the User badge in the contact form
 */
function setBadgeContactForm() {
    const badgeNew = document.getElementById('user-badge--newuser');
    const badgeEdit = document.getElementById('user-badge--initials');
    badgeNew.classList.remove('d-none');
    badgeEdit.classList.add('d-none');
}


/**
 * Sets the User badge in the contact editor
 * @param {Number} id The ID of the contact
 */
function setBadgeEditor(id) {
    const badgeNew = document.getElementById('user-badge--newuser');
    const badgeEdit = document.getElementById('user-badge--initials');
    badgeNew.classList.add('d-none');
    badgeEdit.classList.remove('d-none');
    badgeEdit.style.backgroundColor = users[id]['color'];
    badgeEdit.innerHTML = users[id]['short_name'];
}


/**
 * Sets the buttons in the contact editor
 * @param {Number} id The ID of the contact
 */
function setEditorButtons(id) {
    const btnsNew = document.getElementById('contact-submit-btns');
    const containerSave = document.getElementById('contact-save-btn');
    const contactForm = document.getElementById('contact-form');
    const deleteBtn = document.getElementById('contact-delete-btn');
    btnsNew.classList.add('d-none');
    containerSave.classList.remove('d-none');
    contactForm.setAttribute('onsubmit', `updateContact(${id}); return false;`);
    deleteBtn.classList.remove('d-none');
    deleteBtn.onclick = function () { showDeleteContactRequest('request-contact-delete', id) };
}


/**
 * Sets the buttons in the contact form
 */
function setContactFormButtons() {
    const btnsNew = document.getElementById('contact-submit-btns');
    const containerSave = document.getElementById('contact-save-btn');
    const contactForm = document.getElementById('contact-form');
    const deleteBtn = document.getElementById('contact-delete-btn');
    btnsNew.classList.remove('d-none');
    containerSave.classList.add('d-none');
    contactForm.setAttribute('onsubmit', `saveNewContact(); return false;`);
    deleteBtn.classList.add('d-none');
}


/**
 * Writes the modified contact data to the database and re-renders the display
 * @param {Number} id The ID of the contact
 */
async function updateContact(id) {
    if (!validateContactData()) return;

    await updateUserData(id);
    await updateTaskAssignment(id);
    renderContacts();
    renderContactInformation(id);
    await checkAndUpdateLoggedIn(id);

    currentContactMail = '';
    toggleContactsModal();
    showPopup('contact-edit-popup-btn');
}


/**
 * Updates the user data
 * @param {Number} id The user ID
 */
async function updateUserData(id) {
    const name = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const initials = getInitials(name);

    users[id]['name'] = name;
    users[id]['email'] = email;
    users[id]['phone'] = phone;
    users[id]['short_name'] = initials;

    await saveOnServer('users', users);
}


/**
 * Updates the task's assignees, if a user's email has been modified
 * @param {Number} id The user ID
 */
async function updateTaskAssignment(id) {
    if (currentContactMail == users[id]['email']) return;

    for (let s = 0; s < tasks.length; s++) {
        for (let t = 0; t < tasks[s].length; t++) {
            const assigneeId = tasks[s][t]['assignees'].indexOf(currentContactMail);
            if (assigneeId >= 0) {
                tasks[s][t]['assignees'][assigneeId] = users[id]['email'];
            }
        }
    }

    await saveOnServer('tasks', tasks);
}


/**
 * Checks if the edited user equals the logged-in user and updates the respective data and settings
 * @param {Number} id The user's ID
 */
async function checkAndUpdateLoggedIn(id) {
    if (currentUser['email'] != currentContactMail) return;

    currentUser = users[id];
    saveCurrentUser();
    setHeaderUserBadge();
}


/**
 * Toggles the visibility of the contacts modal
 */
function toggleContactsModal() {
    const modal = document.getElementById('modal-contact');
    const popup = document.getElementById('request-contact-delete')
    const bg = document.getElementById('dark-bg');

    if (!modal.classList.contains('d-none')) {
        modal.classList.remove('modal-show');
        setTimeout(() => {
            modal.classList.toggle('d-none');
        }, MODAL_FADE_TIME);
    }
    else {
        modalFadeIn(modal);
    }
    popup.classList.remove('animation');
    bg.classList.remove('dark-bg');
}


/**
 * Shows the delete request popup
 * @param {string} id ID of the element
 * @param {number} contactId ID of the contact
 */
function showDeleteContactRequest(id, contactId) {
    let popup = document.getElementById(id);
    let yesBtn = document.getElementById('yes-delete-contact');
    let bg = document.getElementById('dark-bg');

    popup.classList.add('animation');
    yesBtn.onclick = function () { deleteContact(id, contactId) };
    bg.classList.add('dark-bg');
}


/**
 * Handles the deletion of the contact
 * @param {string} id ID of the element
 * @param {number} contactId ID of the contact
 */
function deleteContact(id, contactId) {

    if (isUserLoggedIn(contactId)) {
        popupOpen = true;
        closeDeletePopup(id);
        showPopup('user-logged-in');
    } else if (hasUserTaskAssigned(contactId)) {
        popupOpen = true;
        closeDeletePopup(id);
        showPopup('user-has-tasks');
    } else {
        execContactDelete(contactId);
        closeDeletePopup(id);
        toggleContactsModal();
        if (window.innerWidth < 940) {
            toggleShowContactOnMobile();
        }
    }
    popupOpen = false;
}


/**
 * Compares selected contact email with the current user email
 * @param {number} id ID of the contact
 * @returns {boolean}
 */
function isUserLoggedIn(id) {
    return users[id]['email'] == currentUser['email'];
}


/**
 * Checks if the selected contact has any tasks assigned
 * @param {number} id ID of the contact
 * @returns {boolean}
 */
function hasUserTaskAssigned(id) {
    for (let i = 0; i < tasks.length; i++) {
        for (let j = 0; j < tasks[i].length; j++) {
            if (tasks[i][j]['assignees'].indexOf(users[id]['email']) >= 0)
                return true;
        }
    }
    return false;
}


/**
 * Deletes the contact from JSON
 * @param {number} id ID of the contact
 */
function execContactDelete(id) {
    let contactDIV = document.getElementById('contact-div');
    contactDIV.innerHTML = '';

    users.splice(id, 1);
    saveOnServer('users', users);
    renderContacts();
    showPopup('contact-deleted-popup');
}


/**
 * Validates the phone input to digits and some special characters
 * @param {event} evt The key event
 */
function validate(evt) {
    var theEvent = evt || window.event;

    // Handle paste
    if (theEvent.type === 'paste') {
        key = theEvent.clipboardData.getData('text/plain');
    } else {
        // Handle key press
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
    }
    var regex = /[0-9 .+-]+$/;
    if (!regex.test(key)) {
        theEvent.preventDefault();
        if (theEvent.preventDefault) theEvent.preventDefault();
    }
}