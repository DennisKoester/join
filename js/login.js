let currentUser;

async function render() {
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
        window.location.href='./summary.html';
    } else {
       alert('Der eingegebene Benutzer ist nicht vorhanden!');
       showLoginFailedPopup();
    }

    return false
}

/**
 * Shows the popup "User not found" with animation
 */
function showLoginFailedPopup() {
    let popup = document.getElementById('popup-button');

    popup.classList.add('login_animation');
    // setTimeout(function () {
    //     removeAnimation(popup);
    // }, 3000);
}

/**
 * Removes the animation class from the popup
 * @param {string} popup 
 */
function removeAnimation(popup) {
    popup.classList.remove('login_animation');
}

function saveUserOnServer() {
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
}

function passwordForgotten() {
    document.getElementById('login-master').innerHTML = `
    <div class="login_main signup_main forgotten_main">
        <a class="goback" href="./index.html"><img src="./assets/img/goBack.png"></a>
        <form class="login_form forgotten_form" action="https://gruppe-392.developerakademie.net/Join/send_mail.php" method="POST">
            <h2>I forgot my password</h2>
            <img class="margin_underline" src="./assets/img/Vector 5.png">
            <span>Don't worry! We will send you an email with the instructions to reset your password.</span>
            <input class="input_email" id="email" type="email" name="email" placeholder="Email" required>
            <div class="login_form_buttons login_bottom_margin">
            <button type="submit" class="login_button">Send me the email</button></div>
        </form>             
    </div>
    `;
}