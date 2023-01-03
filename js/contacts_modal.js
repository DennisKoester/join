/**
 * Initiates the contact form
 */
function openContactForm() {
    resetInputs();
    hideLabels();
    toggleContactsModal()
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

    // TODO:
    // 1. Set Initiales
    const name = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const initials = getInitials(name);
    // 2. Set User-Color
    const color = generateColors();
    // 3. Write data to users[]
    users.push({
        'name': name,
        'email': email,
        'password': '',
        'phone': phone,
        'short_name': initials,
        'color': color
    });
    // 4. Write data to server
    await saveOnServer('users', users);
    // 5. Re-render contact list
    
    // 6. Render new contact details

    toggleContactsModal();
    showPopup('contact-popup-btn');
}


/**
 * Opens the contact editor
 * @param {Number} id The id of the contact
 */
function openContactEditor(id) {
    setFormData(id);
    setBadge(id);
    setEditorButtons(id);

    toggleContactsModal();
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
 * Sets the User badge in the contact editor
 * @param {Number} id The ID of the contact
 */
function setBadge(id) {
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
    const btnSave = document.getElementById('contact-update-btn');
    btnsNew.classList.add('d-none');
    containerSave.classList.remove('d-none');
    btnSave.setAttribute('onclick', `updateContact(${id})`);
}


/**
 * Writes the modified contact data to the database and re-renders the display
 * @param {Number} id The ID of the contact
 */
function updateContact(id) {
    if (!validateContactData()) return;

    // TODO:
    // 1. Check for modified initiales and update, if necessary
    // 2. Write data to users[id]
    // 3. Write data to server
    // 4. Re-render contact list
    // 5. Re-render contact details
    // 6. Check if modified user is logged in user. If so:
    // 6.1 Update user icon in header
    // 6.2 Update currentUser (local and on server)

    toggleContactsModal();
    // TODO: showPopup('...');

}


/**
 * Toggles the visibility of the contacts modal
 */
function toggleContactsModal() {
    const modal = document.getElementById('modal-contact');
    if (!modal.classList.contains('d-none')) {
        modal.classList.remove('modal-show');
        setTimeout(() => {
            modal.classList.toggle('d-none');
        }, MODAL_FADE_TIME);
    }
    else {
        modalFadeIn(modal);
    }
}