function register() {
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    users.push({name: username, email: email, password: password})

    let usersAsString = JSON.stringify(users);
    localStorage.setItem('users', usersAsString);


    console.log(users);
}