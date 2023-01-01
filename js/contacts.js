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
            <div class="edit-contact"><img src="./assets/img/edit_contact.png"><span class="edit-contact-text">Edit Contact</span></div>
        </div>
        <div class="email-margins"><b>Email</b></div>
        <a class="users-email-big" id="u-email${index}">testmail</a>
        <div class="phone-margins"><b>Phone</b></div>
        <div id="u-phone-number${index}">no phone number</div>
    `;
    renderContactInformationById(index);
    backgroundColorOfSelected(index);
    contactSlideInAnimation();

    if (window.innerWidth < 940) {
        showContactOnMobile();
    }
}


function showContactOnMobile() {
    let contactsContainer = document.getElementById('contacts-container');
    contactsContainer.style.display = 'block';
    toggleClassList('contacts-menu', 'd-none');
    toggleClassList('new-contact-btn', 'd-none');
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


function createContact() {
    showPopup('contact-popup-btn');
}