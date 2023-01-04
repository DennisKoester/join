/**
 * Loading data from server
 */
async function initLogin() {
    await loadDataFromServer();
}


/**
 * Setting currentUser to Guest when Logging in as Guest
 */
async function guestLogin() {

    currentUser = {
        "name": "Guest",
        "email": "",
        "password": "",
        "phone": "",
        "short_name": "G",
        "color": "HSL(150, 100%, 50%)",
    };
    await saveOnServer('currentUser', currentUser);
    window.location.href = './summary.html?login=1'
}


/**
 * Validating entered user data before login
 * @param {Object} e 
 * @returns {boolean}
 */
async function login(e) {
    e.preventDefault();

    let email = document.getElementById('email');
    let password = document.getElementById('password');

    currentUser = users.find(u => u.email == email.value && u.password == password.value); //checking if user exists

    if (currentUser) {
        await saveOnServer('currentUser', currentUser);
        window.location.href = './summary.html?login=2';
    } else {
        showPopupMessage('popup-button');
    }
    return false
}


/**
 * Shows a popup message with animation
 * @param {string} id
 */
function showPopupMessage(id) {
    let popup = document.getElementById(id);

    popup.classList.add('login_animation');
    setTimeout(function () {
        removeAnimation(popup);
    }, 3000);
}


/**
 * Removes the animation class from popup
 * @param {string} popup 
 */
function removeAnimation(popup) {
    popup.classList.remove('login_animation');
}


/**
 * Render password forgotten html
 */
function passwordForgotten() {
    document.getElementById('login-master').innerHTML = `
    <div class="login_main signup_main forgotten_main">
        <a class="goback" href="./index.html"><img class="goback_img" src="./assets/img/goBack.png"></a>
        <form class="login_form forgotten_form" onsubmit="onSubmit(event)">
            <h2>I forgot my password</h2>
            <img class="margin_underline" src="./assets/img/horizontal_blue_line.png">
            <span>Don't worry! We will send you an email with the instructions to reset your password.</span>
            <input class="input_email" id="email-field" type="email" name="email" placeholder="Email" required>
            <div class="login_form_buttons login_bottom_margin">
            <button type="submit" class="login_button">Send me the email</button></div>
        </form>             
    </div>
    `;
}


/**
 * Sending email to reset password
 * @param {Object} event
 */
async function onSubmit(event) {
    event.preventDefault();
    if (checkIfEmailExists()) {
        let formData = new FormData(event.target); //create a FormData based on our Form Element in HTML
        let response = await action(formData);
        if (response.ok) {
            showPopupMessage('email-reset');
            setTimeout(function () {
                window.location.href = './index.html';
            }, 3000);
        }
    }
}


/**
 * Fetching php script to send mail
 * @param {Object} formData 
 * @returns 
 */
function action(formData) {
    const input = 'https://gruppe-392.developerakademie.net/join/send_mail.php';
    const requestInit = {
        method: 'post',
        body: formData
    };

    return fetch(
        input,
        requestInit
    );
}


/**
 * Checking if user with entered Email exists
 */
function checkIfEmailExists() {
    let email = document.getElementById('email-field');
    let user = users.find(u => u.email == email.value);
    if (user) {
        return true;
    } else {
        showPopupMessage('email-failed');
    }
}


/**
 * Check if passwords match and reset the password
 */
async function resetPassword(event) {
    event.preventDefault();
    let password1 = document.getElementById('password-field-1').value;
    let password2 = document.getElementById('password-field-2').value;

    if (password1 == password2) {
        const urlParams = new URLSearchParams(window.location.search);
        const userEmail = urlParams.get('email');
        let index = users.findIndex(u => u.email == userEmail);
        users[index]['password'] = password1;
        await saveOnServer('users', users);
        showSuccessMessage();
    } else {
        showPopupMessage('password-failed');
    }
}


/**
 * Show success message and return to Log in page
 */
function showSuccessMessage() {
    showPopupMessage('password-success');
    setTimeout(function () {
        window.location.href = './index.html';
    }, 3000);
}
