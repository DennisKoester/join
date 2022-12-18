function init() {
    animation();
    signUpQuery();
    setURL('http://developerakademie.com/smallest_backend_ever');
}

function animation() {
    setTimeout(() => {document.getElementById('preloader').classList.add('d_none')}, 1000);
}

function signUpQuery() {
    const urlParams = new URLSearchParams(window.location.search);
    const msg = urlParams.get('msg');
    if(msg) {
        document.getElementById('msg-box').innerHTML = msg;
        document.getElementById('msg-box').classList.remove('d_none');
    }
}

function login(e) {
    e.preventDefault();

    let email = document.getElementById('email');
    let password = document.getElementById('password');

    //load users
    if(JSON.parse(localStorage.getItem('users'))) {
        users = JSON.parse(localStorage.getItem('users'));
    }

    //checking if user exists
    let user = users.find(u => u.email == email.value && u.password == password.value);

    if (user) {
        window.location.href='./summary.html?login=1';
    } else {
        document.getElementById('error-login').innerHTML = 'Der eingegebene Benutzer ist nicht vorhanden!';
    }

    return false

}