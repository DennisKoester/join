const MOBILE_MAX_WIDTH = 970;
let currentPage = '';

async function init() {
    await includeHTML();

    handleWelcomeOnMobile();

    currentPage = 'add-task';
    const selected = document.getElementById(`menu-${currentPage}`);
    selected.classList.add('nav-item-active');
    
    openPage(currentPage, false);
}

function handleWelcomeOnMobile() {
    const windowWidth = window.innerWidth;

    if (windowWidth <= MOBILE_MAX_WIDTH) {
        const welcome = document.getElementById('welcome-mobile');
        welcome.classList.remove('d-none');
        setTimeout(() => {
            welcome.classList.add('welcome-mobile-fade');
        }, 1);
        setTimeout(() => {
            welcome.classList.add('d-none');
        }, 1250);
    }
}


function openPage(id, context) {
    const pageToOpen = document.getElementById(id);
    const pageToClose = document.getElementById(currentPage);

    pageToClose.classList.add('d-none');
    pageToOpen.classList.remove('d-none');

    if (context) {
        // TODO: Close context menu
    }
    else {
        const menuToActivate = document.getElementById(`menu-${id}`);
        const menuToDeactivate = document.getElementById(`menu-${currentPage}`);

        if (currentPage != 'help') {
            menuToDeactivate.classList.remove('nav-item-active');
        }
        if (id != 'help') {
            menuToActivate.classList.add('nav-item-active');
        }
        
        currentPage = id;
    }
}


function toggleContextMenu() {
    const ctxMenu = document.getElementById('contextMenu');
    ctxMenu.classList.toggle('d-none');
}


function logout() {

}