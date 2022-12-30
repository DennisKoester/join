
/**
 * Register a new user by submitting the Sign up form
 */
async function registerUser(e) {
    e.preventDefault();

    let username = document.getElementById("username");
    let email = document.getElementById("email");
    let password = document.getElementById("password");  
    let initials = getInitials(username.value);
    let color = generateColors();

    users = await loadFromServer('users');
    //checking if e-mail is already in use
    let user = users.find(u => u.email == email.value);

    if(user) {
        showSignupFailedPopup();
    } else {
        users.push({name: username.value, email: email.value, password: password.value, short_name: initials, color: color});
        await saveOnServer('users', users);
        window.location.href = './index.html?msg=success';
    }

    return false;
}

/**
 * Create inititials from first letters of Username
 */
function getInitials(name) {
    const fullName = name.split(' ');
    const initials = fullName.shift().charAt(0) + fullName.pop().charAt(0);
    console.log(initials);
    return initials.toUpperCase();
}

/**
 * Generate random color for User initials background
 */
function generateColors() {
    let h = Math.floor(Math.random() * 359);
    return color = `hsl(${h}, 100%, 50%)`;
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