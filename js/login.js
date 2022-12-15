function init() {
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
        document.getElementById('msg-box').innerHTML = msg;
        document.getElementById('msg-box').classList.remove('d_none');
    }
}

function login(e) {
    e.preventDefault();

    let users = JSON.parse(localStorage.getItem('users'))
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    
    console.log(email.value);
    console.log(password.value);

    email.value = email.value.trim();
    password.value = password.value.trim();

    let user = users.find(u => u.email == email.value && u.password == password.value);
    console.log(user);
    if (user) {
        window.location.href='./summary.html?login=1';
    } else alert('Der eingegebene Benutzer ist nicht vorhanden');
    
    // if (email == '' || password == '') {
    //     alert('Please fill in all fields');
    //     return;
    // }

    return false

}