let alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']


async function initContacts() {
    await init();
    renderContacts();
}


function renderContacts() {
    for (let i = 0; i < alphabet.length; i++) {
        for (let j = 0; j < users.length; j++) {
            if (alphabet[i] == getFirstLetterOfLastName(j)) {
                let container = document.getElementById('contacts-menu-scrollable');
                container.innerHTML += `<div class="alphabet-letter">${alphabet[i]}</div>`;
                container.innerHTML += `<div class="contacts-underline"></div>`;
                break;
            }
        }
        for (let j = 0; j < users.length; j++) {
            if (alphabet[i] == getFirstLetterOfLastName(j)) {
                renderContactDivHTML(j);
            }
        }
    }
}


function getFirstLetterOfLastName(j) {
    let user = users[j]['name'];
    let names = user.split(' ');
    let surname = names[names.length - 1];
    return surname[0];
}


function renderContactDivHTML(index) {
    document.getElementById('contacts-menu-scrollable').innerHTML += `
    <div id="contact-container${index}" class="contact-div" onclick="renderContactInformation(${index})">
        <div class="username-initials" id="username-initials${index}"></div>
        <div>
            <div id="users-name${index}">Hans Test</div>
            <a class="users-email" id="users-email${index}">hans@test.de</a>
        </div>
    </div>
    `;

    insertUserInformationById(index);
}


function insertUserInformationById(index) {
    document.getElementById(`username-initials${index}`).innerHTML = users[index]['short_name'];
    document.getElementById(`username-initials${index}`).style.backgroundColor = users[index]['color'];
    document.getElementById(`users-name${index}`).innerHTML = users[index]['name'];
    document.getElementById(`users-email${index}`).innerHTML = users[index]['email'];
    document.getElementById(`users-email${index}`).href = 'mailto:' + users[index]['email'];
}


function renderContactInformation(index) {
    document.getElementById('contact-div').innerHTML = `
        <div class="contact-div-big">
        <div class="username-initials-big" id="u-initials${index}">JM</div>
            <div>
                <div class="username-big" id="u-name${index}">Hans Test</div>
                <img onclick="openAddTaskContact(${index})" src="./assets/img/add_task.png">
            </div>
        </div>
        <div class="contact-and-edit">
            <div class="contact-information">Contact Information</div>
            <div id="edit-contact" class="edit-contact"><img src="./assets/img/edit_contact.png"><span class="edit-contact-text">Edit Contact</span></div>
        </div>
        <div class="email-margins"><b>Email</b></div>
        <a class="users-email-big" id="u-email${index}">testmail</a>
        <div class="phone-margins"><b>Phone</b></div>
        <div id="u-phone-number${index}">no phone number</div>
    `;
    renderContactInformationById(index);
    backgroundColorOfSelected(index);

    if (window.innerWidth < 940) {
        toggleShowContactOnMobile();
    } else {
        contactSlideInAnimation();

    }
}


function toggleShowContactOnMobile() {
    let contactsContainer = document.getElementById('contacts-container');
    let contentContainer = document.getElementById('content-container');
    if (!contactsContainer.style.display) {
        contactsContainer.style.display = 'block';
        contentContainer.style.setProperty('margin-top', '50px');
        document.body.style.backgroundColor = 'var(--bg-body)';
    } else {
        contactsContainer.style.removeProperty('display');
        contentContainer.style.removeProperty('margin-top');
        document.body.style.backgroundColor = 'white';
        resetBackgroundColorSelected();
    }
    toggleClassList('contacts-menu', 'd-none');
    toggleClassList('new-contact-btn', 'd-none');
    toggleClassList('edit-contact', 'd-none');
}


function renderContactInformationById(index) {
    document.getElementById(`u-initials${index}`).innerHTML = users[index]['short_name'];
    document.getElementById(`u-initials${index}`).style.backgroundColor = users[index]['color'];
    document.getElementById(`u-name${index}`).innerHTML = users[index]['name'];
    document.getElementById(`u-email${index}`).innerHTML = users[index]['email'];
    document.getElementById(`u-email${index}`).href = 'mailto:' + users[index]['email'];
    if (users[index]['phone']) {
        document.getElementById(`u-phone-number${index}`).innerHTML = users[index]['phone'];
    }
    document.getElementById('contact-edit-btn').setAttribute('onclick', `editContact(${index})`);
    document.getElementById('edit-contact').setAttribute('onclick', `editContact(${index})`);
}


/* function backgroundColorOfSelected(index) {
    for (let i = 0; i < users.length; i++) {
        if (document.getElementById(`contact-container${i}`).classList.contains('contacts-selected')) {
            document.getElementById(`contact-container${i}`).classList.remove('contacts-selected');
        }
    }
    document.getElementById(`contact-container${index}`).classList.add('contacts-selected');
} */


function backgroundColorOfSelected(index) {
    let contacts = document.querySelectorAll('.contact-div');
    for (let i = 0; i < contacts.length; i++) {
        contacts[i].classList.remove('activeContact');
        contacts[i].classList.remove('nohover');
    }
    toggleClassList(`contact-container${index}`, 'activeContact');
    toggleClassList(`contact-container${index}`, 'nohover');
}


function resetBackgroundColorSelected() {
    let contacts = document.querySelectorAll('.contact-div');
    for (let i = 0; i < contacts.length; i++) {
        contacts[i].classList.remove('activeContact');
        contacts[i].classList.remove('nohover');
    }
}


async function openAddTaskContact(index) {
    currentAssignees = [];
    currentAssignees.push(users[index]);
    await openAddTask();
    renderAssignees();
}


function contactSlideInAnimation() {
    let contactCard = document.getElementById('contact-div');

    contactCard.classList.add('animationContact');
    setTimeout(function () {
        contactCard.classList.remove('animationContact')
    }, 225);
}


/**
 * Saves the new contact
 */
function saveNewContact() {


    showPopup('contact-popup-btn');
}


/**
 * Opens the contact editor
 * @param {Number} id The id of the contact
 */
function editContact(id) {
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

    inputName.value = users[id]['name'];
    inputEmail.value = users[id]['email'];
    inputPhone.value = users[id]['phone'];
    badgeNew.classList.add('d-none');
    badgeEdit.classList.remove('d-none');



    toggleContactsModal();
    btnsNew.classList.add('d-none');
    containerSave.classList.remove('d-none');
    btnSave.setAttribute('onclick', `updateContact(${id})`);
}


/**
 * Writes the modified contact data to the database and re-renders the display
 * @param {Number} id The ID of the contact
 */
function updateContact(id) {

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