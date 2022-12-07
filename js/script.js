const MOBILE_MAX_WIDTH = 940;
let currentPage = '';


/**
 * Initiates the main page
 */
async function init() {
    await includeHTML();

    handleWelcomeOnMobile();

    currentPage = 'add-task';
    const selected = document.getElementById(`menu-${currentPage}`);
    selected.classList.add('nav-item-active');
    
    openPage(currentPage, false);
}


/**
 * Controls the welcome screen on mobile view
 */
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


/**
 * Displays the selected page and switches to the respective menu item
 * @param {String} id The name of the page to be displayed
 * @param {Boolean} isContext True = selected page in context menu
 */
function openPage(id, isContext) {
    const pageToOpen = document.getElementById(id);
    const pageToClose = document.getElementById(currentPage);

    pageToClose.classList.add('d-none');
    pageToOpen.classList.remove('d-none');

    if (isContext) {
        // TODO: Close context menu
    }
    else {
        controlMenuHighlighting(id);
    }
}


/**
 * Switches the highlighted menu item
 * @param {String} id The name of the page to be displayed
 */
function controlMenuHighlighting(id) {
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


/**
 * Toggles the visibility of the header context menu
 */
function toggleContextMenu() {
    const ctxMenu = document.getElementById('contextMenu');

    if (ctxMenu.classList.contains('d-none')) {
        showCtxMenu(ctxMenu);
    }
    else {
        hideCtxMenu(ctxMenu);
    }
}


/**
 * Shows the header context menu
 * @param {Object} ctxMenu The header context menu
 */
function showCtxMenu(ctxMenu) {
    ctxMenu.classList.remove('d-none');
    setTimeout(() => {
        ctxMenu.classList.add('sub-nav-show');
    }, 1);
}


/**
 * Hides the header context menu
 * @param {Object} ctxMenu The header context menu
 */
function hideCtxMenu(ctxMenu) {
    ctxMenu.classList.remove('sub-nav-show');
    setTimeout(() => {
        ctxMenu.classList.add('d-none');
    }, 220);
}


function logout() {

}