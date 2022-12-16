function register(e) {
    e.preventDefault();

    let username = document.getElementById("username");
    let email = document.getElementById("email");
    let password = document.getElementById("password");  
    
    if(JSON.parse(localStorage.getItem('users'))) {
        users = JSON.parse(localStorage.getItem('users'));
    }

    //checking if e-mail is already in use
    let user = users.find(u => u.email == email.value);

    if(user) {
        document.getElementById('error-message').innerHTML = 'Die eingegebene E-Mail Adresse wird bereits verwendet, bitte versuche es mit einer anderen Adresse!';
    } else {

    //generate random colors
    let h = Math.floor(Math.random() * 359);
    let color = `hsl(${h}, 50%, 95%)`;

    //save data in users array and local storage
    users.push({name: username.value, email: email.value, password: password.value, color: color});

    let usersAsString = JSON.stringify(users);
    localStorage.setItem('users', usersAsString);

    //load index.html
    window.location.href = './index.html?msg=Deine Registrierung war erfolgreich, du kannst dich jetzt einloggen!';
    }

    return false;
}