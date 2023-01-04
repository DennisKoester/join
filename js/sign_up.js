
/**
 * Register a new user by submitting the Sign up form
 * @param {Object} e
 */
async function registerUser(e) {
    e.preventDefault();

    let username = document.getElementById("username");
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let isNameValid = nameValidation(username, 'name-validation', 'hidden');
    if (!isNameValid) return;
    let initials = getInitials(username.value);
    let color = generateColors();
    let user = users.find(u => u.email == email.value);

    if (user) {
        showSignupPopup('popup-failed-signup');
    } else {
        users.push({name: username.value.trim(), email: email.value, password: password.value, phone: "", short_name: initials, color: color});
        await saveOnServer('users', users);
        showSignupPopup('popup-success-signup');
        setTimeout(function () {window.location.href = './index.html?msg=success';}, 3000);
    }
    return false;
}


/**
 * Shows a popup with animation
 * @param {string} id
 */
function showSignupPopup(id) {
    let popup = document.getElementById(id);
    popup.classList.add('login_animation');
    setTimeout(function () {
        removeAnimationSignup(popup);
    }, 3000);
}

/**
 * Removes the animation class from popup
 * @param {string} popup 
 */
function removeAnimationSignup(popup) {
    popup.classList.remove('login_animation');
}