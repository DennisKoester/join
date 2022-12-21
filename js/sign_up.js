async function register(e) {
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
        alert('Die eingegebene E-Mail Adresse wird bereits verwendet, bitte versuche es mit einer anderen Adresse!');
    } else {
    await saveOnServer(username, email, password, initials, color);
    window.location.href = './index.html?msg=Deine Registrierung war erfolgreich, du kannst dich jetzt einloggen!';
    }
    return false;
}

async function saveOnServer(username, email, password, initials, color) {
    users.push({name: username.value, email: email.value, password: password.value, short_name: initials, color: color});
    await backend.setItem('users', JSON.stringify(users));
}

function getInitials(name) {
    const fullName = name.split(' ');
    const initials = fullName.shift().charAt(0) + fullName.pop().charAt(0);
    console.log(initials);
    return initials.toUpperCase();
}

//generate random colors
function generateColors() {
    let h = Math.floor(Math.random() * 359);
    return color = `hsl(${h}, 100%, 50%)`;
}