function register() {
    let username = document.getElementById("username");
    let email = document.getElementById("email");
    let password = document.getElementById("password");

    users.push({name: username.value, email: email.value, password: password.value});

    let usersAsString = JSON.stringify(users);
    localStorage.setItem('users', usersAsString);

    window.location.href = './index.html'
}