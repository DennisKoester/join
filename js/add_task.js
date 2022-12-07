function prioUrgent() {
    let btn = document.getElementById('urgend-btn');
    let img = document.getElementById('urgent-btn-img');
    backgroundColor = btn.style.backgroundColor;

    if (backgroundColor == 'rgb(255, 255, 255)') {
        btn.style.backgroundColor = '#FF3D00';
        btn.style.color = 'white';
        img.src = "./assets/img/urgent-white.svg"
    } else {
        btn.style.backgroundColor = '#FFFFFF';
        btn.style.color = 'black';
        img.src = "./assets/img/urgent.svg"
    }
};


function prioMedium() {
    let btn = document.getElementById('medium-btn');
    let img = document.getElementById('medium-btn-img');
    backgroundColor = btn.style.backgroundColor;

    if (backgroundColor == 'rgb(255, 255, 255)') {
        btn.style.backgroundColor = '#FFA800';
        btn.style.color = 'white';
        img.src = "./assets/img/medium-white.svg"
    } else {
        btn.style.backgroundColor = '#FFFFFF';
        btn.style.color = 'black';
        img.src = "./assets/img/medium.svg"
    }
};


function prioLow() {
    const btn = document.getElementById('low-btn');
    let img = document.getElementById('low-btn-img');
    backgroundColor = btn.style.backgroundColor;

    if (backgroundColor == 'rgb(255, 255, 255)') {
        btn.style.backgroundColor = '#7AE229';
        btn.style.color = 'white';
        img.src = "./assets/img/low-white.svg"
    } else {
        btn.style.backgroundColor = '#FFFFFF';
        btn.style.color = 'black';
        img.src = "./assets/img/low.svg"
    }
};


function toggleClassList(id, img, classList, classList1) {
    document.getElementById(id).classList.toggle(classList);
    document.getElementById(img).classList.toggle(classList1);
    // document.body.classList.toggle("overlay");
}


function dropDownToggle(id, img) {
    toggleClassList(id, img, 'open', 'rotate180');
}

/* function dropDownToggle(box, id) {
    toggleClassList(id, 'd-none');
    document.addEventListener('click', function handleClickOutsideBox(event) {
        let area = document.getElementById(`${box}`);
        if (!area.contains(event.target))
            addClassList(`${id}`, 'd-none')
    })
};

 */


function showInputField(input, container, dropdown, img) {
    document.getElementById(input).classList.remove('d-none');
    document.getElementById(container).classList.add('d-none');
    toggleClassList(dropdown, img, 'open', 'rotate180');
    // input.classList.remove('d-none');
    // dropdown.classList.add('d-none'); // TODO Why is that not working?!
}


function clearInputField(input, container, dropdown) {
    document.getElementById(input).value = '';
    document.getElementById(container).classList.add('d-none');
    document.getElementById(dropdown).classList.remove('d-none');
}