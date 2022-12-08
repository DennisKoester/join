const MOBILE_MAX_WIDTH = 940;
const WELCOME_MSG_DELAY = 800;
const WELCOME_MSG_TRANS = 400;
const HEADER_CTX_MENU_ANIM_TIME = 220;
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
    const delay = WELCOME_MSG_TRANS + WELCOME_MSG_DELAY + 10;

    if (windowWidth <= MOBILE_MAX_WIDTH) {
        const welcome = document.getElementById('welcome-mobile');
        welcome.classList.remove('d-none');
        setTimeout(() => {
            welcome.classList.add('welcome-mobile-fade');
        }, 1);
        setTimeout(() => {
            welcome.classList.add('d-none');
        }, delay);
    }
}


/**
 * Displays the selected page and switches to the respective menu item
 * @param {String} clickedPage The name of the page to be displayed
 * @param {Boolean} isContext True = selected page in context menu
 */
function openPage(clickedPage, isContext) {
    const pageToOpen = document.getElementById(clickedPage);
    const pageToClose = document.getElementById(currentPage);

    pageToClose.classList.add('d-none');
    pageToOpen.classList.remove('d-none');

    if (isContext) {
        toggleContextMenu();
    }
    
    controlMenuHighlighting(clickedPage, isContext);
    currentPage = clickedPage;
}


/**
 * Switches the highlighted menu item
 * @param {String} clickedPage The name of the page to be displayed
 */
function controlMenuHighlighting(clickedPage, isContext) {
    const menuToActivate = document.getElementById(`menu-${clickedPage}`);
    const menuToDeactivate = document.getElementById(`menu-${currentPage}`);

    if (currentPage != 'help') {
        menuToDeactivate.classList.remove('nav-item-active');
    }
    if (clickedPage != 'help' && !isContext) {
        menuToActivate.classList.add('nav-item-active');
    }
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
    }, HEADER_CTX_MENU_ANIM_TIME);
}


function logout() {

}