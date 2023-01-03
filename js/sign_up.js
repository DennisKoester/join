
/**
 * Register a new user by submitting the Sign up form
 */
async function registerUser(e) {
    e.preventDefault();

    let username = document.getElementById("username");
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let isNameValid = nameValidation(username, 'name-validation', 'd-none');

    if (!isNameValid) return;

    let initials = getInitials(username.value);
    let color = generateColors();

    // users = await loadFromServer('users');
    //checking if e-mail is already in use
    let user = users.find(u => u.email == email.value);

    if (user) {
        showSignupFailedPopup();
    } else {
        users.push({name: username.value, email: email.value, password: password.value, phone: "", short_name: initials, color: color, image: ""});
        await saveOnServer('users', users);
        window.location.href = './index.html?msg=success';
    }

    return false;
}


/**
 * Shows the popup "Email already in use" with animation
 */
function showSignupFailedPopup() {
    let popup = document.getElementById('popup-button-signup');

    popup.classList.add('login_animation');
    setTimeout(function () {
        removeAnimationSignup(popup);
    }, 3000);
}

/**
 * Removes the animation class from the popup
 * @param {string} popup 
 */
function removeAnimationSignup(popup) {
    popup.classList.remove('login_animation');
}