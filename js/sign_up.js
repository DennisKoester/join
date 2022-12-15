function register(e) {
    e.preventDefault();

    let username = document.getElementById("username");
    let email = document.getElementById("email");
    let password = document.getElementById("password");  
    
    //generate random colors
    let h = Math.floor(Math.random() * 359);
    let color = `hsl(${h}, 50%, 95%)`;

    users.push({name: username.value, email: email.value, password: password.value, color: color});

    let usersAsString = JSON.stringify(users);
    localStorage.setItem('users', usersAsString);

    window.location.href = './index.html?msg=Deine Registrierung war erfolgreich, du kannst dich jetzt einloggen!';

    return false;
}