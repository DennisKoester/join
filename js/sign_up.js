

async function register(e) {
    e.preventDefault();

    let username = document.getElementById("username");
    let email = document.getElementById("email");
    let password = document.getElementById("password");  
 
    // await downloadFromServer();
    // if(await JSON.parse(backend.getItem('users'))) {
    //     users = await JSON.parse(backend.getItem('users'));
    // }
    if(await loadBackend('users')) {
        await loadBackend('users');
    }

    //checking if e-mail is already in use
    let user = users.find(u => u.email == email.value);

    if(user) {
        //document.getElementById('error-message').innerHTML = 'Die eingegebene E-Mail Adresse wird bereits verwendet, bitte versuche es mit einer anderen Adresse!';
        alert('Die eingegebene E-Mail Adresse wird bereits verwendet, bitte versuche es mit einer anderen Adresse!');
    } else {

    //generate random colors
    let h = Math.floor(Math.random() * 359);
    let color = `hsl(${h}, 100%, 50%)`;

    let initials = getInitials(username.value);

    //save data in users array
    users.push({name: username.value, email: email.value, password: password.value, short_name: initials, color: color});
    await backend.setItem('users', JSON.stringify(users));

    //load index.html
    window.location.href = './index.html?msg=Deine Registrierung war erfolgreich, du kannst dich jetzt einloggen!';
    }

    return false;
}

function getInitials(name) {
    const fullName = name.split(' ');
    const initials = fullName.shift().charAt(0) + fullName.pop().charAt(0);
    console.log(initials);
    return initials.toUpperCase();
}