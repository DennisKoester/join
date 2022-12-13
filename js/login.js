

function animation() {
    var loader = document.getElementById('preloader');

    window.addEventListener('load', function () {
        loader.style.display = 'none';
    });
}


function login() {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    
    console.log(email);
    console.log(password);

    email = email.trim();
    password = password.trim();
    
    // if (email == '' || password == '') {
    //     alert('Please fill in all fields');
    //     return;
    // }

    location.href='./summary.html?login=1';

}