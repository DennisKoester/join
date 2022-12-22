let alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']

function renderContacts() {
    for (let i = 0; i < alphabet.length; i++) {
        for(let j = 0; j < users.length; j++) {
            if(alphabet[i] == users[j]['name'].charAt(0)) {
                let container = document.getElementById('contacts-menu-scrollable');
                container.innerHTML += alphabet[i];
                container.innerHTML += `<div class="contacts-underline"></div>`;
                break;
            }
        }
        for(let j = 0; j < users.length; j++) {
            if(alphabet[i] == users[j]['name'].charAt(0)) {
                renderContactDivHTML(j);
            }
        }
    }
}

function renderContactDivHTML(index) {
    document.getElementById('contacts-menu-scrollable').innerHTML +=  `
    <div class="contact-div">
        <div class="username-initials" id="username-initials${index}"></div>
        <div>
            <div id="users-name${index}">Hans Test</div>
            <a class="users-email" id="users-email${index}">hans@test.de</a>
        </div>
    </div>`;

    insertUserInformationById(index);
}

function insertUserInformationById(index) {
    document.getElementById(`username-initials${index}`).innerHTML = users[index]['short_name'];
    document.getElementById(`username-initials${index}`).style.backgroundColor = users[index]['color'];
    document.getElementById(`users-name${index}`).innerHTML = users[index]['name'];
    document.getElementById(`users-email${index}`).innerHTML = users[index]['email'];
    document.getElementById(`users-email${index}`).href = 'mailto:' + users[index]['email'];
}

