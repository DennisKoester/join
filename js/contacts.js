/**
 * Initiates contact page
 */
async function initContacts() {
    await init();
    renderContacts();
}


/**
 * Renders all contacts in the list
 */
function renderContacts() {
    let container = document.getElementById('contacts-menu-scrollable');
    container.innerHTML = '';
    for (let i = 0; i < alphabet.length; i++) {
        for (let j = 0; j < users.length; j++) {
            if (alphabet[i] == getFirstLetterOfLastName(j)) {
                container.innerHTML += `<div class="alphabet-letter">${alphabet[i]}</div>`;
                container.innerHTML += `<div class="contacts-underline"></div>`;
                break;
            }
        }
        for (let j = 0; j < users.length; j++) {
            if (alphabet[i] == getFirstLetterOfLastName(j)) {
                renderContactDiv(j);
            }
        }
    }
}


/**
 * Renders the contact in the list
 * @param {number} index Index of the user
 */
function renderContactDiv(index) {
    let contactsMenu = document.getElementById('contacts-menu-scrollable');
    contactsMenu.innerHTML += contactDivHTML(index);

    insertUserInformationById(index);
}


/**
 * Inserts all user information in the contact card
 * @param {number} index Index of the user
 */
function insertUserInformationById(index) {
    document.getElementById(`username-initials${index}`).innerHTML = users[index]['short_name'];
    document.getElementById(`username-initials${index}`).style.backgroundColor = users[index]['color'];
    document.getElementById(`users-name${index}`).innerHTML = users[index]['name'];
    document.getElementById(`users-email${index}`).innerHTML = users[index]['email'];
}


/**
 * 
 * @param {number} index Index of the user
 */
function renderContactInformation(index) {
    let contactDIV = document.getElementById('contact-div');
    contactDIV.innerHTML = '';
    contactDIV.innerHTML = contactCardHTML(index);

    renderContactInformationById(index);
    backgroundColorOfSelected(index);

    if (window.innerWidth < 940) {
        toggleShowContactOnMobile();
    } else {
        contactSlideInAnimation();
    }
}


/**
 * Handles the view of the contacts page for mobile view
 */
function toggleShowContactOnMobile() {
    let contactsContainer = document.getElementById('contacts-container');
    let contentContainer = document.getElementById('content-container');
    if (!contactsContainer.style.display) {
        contactsContainer.style.display = 'block';
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


/**
 * 
 * @param {number} index Index of the user
 */
function renderContactInformationById(index) {
    document.getElementById(`u-initials${index}`).innerHTML = users[index]['short_name'];
    document.getElementById(`u-initials${index}`).style.backgroundColor = users[index]['color'];
    document.getElementById(`u-name${index}`).innerHTML = users[index]['name'];
    document.getElementById(`u-email${index}`).innerHTML = users[index]['email'];
    document.getElementById(`u-email${index}`).href = 'mailto:' + users[index]['email'];
    if (users[index]['phone']) {
        document.getElementById(`u-phone-number${index}`).innerHTML = users[index]['phone'];
    }
    document.getElementById('contact-edit-btn').setAttribute('onclick', `openContactEditor(${index})`);
    document.getElementById('edit-contact').setAttribute('onclick', `openContactEditor(${index})`);
}



/**
 * 
 * @param {number} index Index of the user
 */
function backgroundColorOfSelected(index) {
    let contacts = document.querySelectorAll('.contact-div');
    for (let i = 0; i < contacts.length; i++) {
        contacts[i].classList.remove('activeContact');
        contacts[i].classList.remove('nohover');
    }
    toggleClassList(`contact-container${index}`, 'activeContact');
    toggleClassList(`contact-container${index}`, 'nohover');
}


/**
 * Resets the background color of the selected contact for mobile view
 */
function resetBackgroundColorSelected() {
    let contacts = document.querySelectorAll('.contact-div');
    for (let i = 0; i < contacts.length; i++) {
        contacts[i].classList.remove('activeContact');
        contacts[i].classList.remove('nohover');
    }
}


/**
 * Opens the add task modal with the current contact selected as assignee
 * @param {number} index Index of the selected contact
 */
async function openAddTaskContact(index) {
    currentAssignees = [];
    await openAddTask();
    renderAssignees();
    selectAssignee(index);
}


/**
 * Animation for the contact information in the contact card
 */
function contactSlideInAnimation() {
    let contactCard = document.getElementById('contact-div');

    contactCard.classList.add('animationContact');
    setTimeout(function () {
        contactCard.classList.remove('animationContact')
    }, 225);
}