function redBtn() {
    const btn = document.getElementById('urgend-btn');
    let img = document.getElementById('arrows');
    backgroundColor = btn.style.backgroundColor;
    console.log (backgroundColor, "test");

    if (backgroundColor == '#FFFFFF') {
        btn.style.backgroundColor = '#FF3D00';
        btn.style.color = 'white';
        img.style.filter = 'brightness(0) invert(1)'
    } else {
        btn.style.backgroundColor = '#FFFFFF';
        btn.style.color = 'black';
        // img.style.filter = 'brightness(0) invert(1)'
    }

};







