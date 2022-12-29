let currentUser;

async function initLogin() {
    loadDataFromServer();
    animation();
    signUpQuery();
}

function animation() {
    setTimeout(() => {document.getElementById('preloader').classList.add('d_none')}, 1000);
}

function signUpQuery() {
    const urlParams = new URLSearchParams(window.location.search);
    const msg = urlParams.get('msg');
    if(msg) {
        document.getElementById('msg-box').innerHTML = 'Deine Registrierung war erfolgreich, du kannst dich jetzt einloggen!';
        document.getElementById('msg-box').classList.remove('d_none');
    }
}

async function login(e) {
    e.preventDefault();

    let email = document.getElementById('email');
    let password = document.getElementById('password');

    users = await loadFromServer('users');
    //checking if user exists
    currentUser = users.find(u => u.email == email.value && u.password == password.value);

    if (currentUser) {
        saveUserOnServer();
        window.location.href='./summary.html?login=1';
    } else {
        alert('Der eingegebene Benutzer ist nicht vorhanden!')
    }

    return false
}

function saveUserOnServer() {
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
}