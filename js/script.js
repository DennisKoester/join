const MOBILE_MAX_WIDTH = 940;
const WELCOME_MSG_DELAY = 800;
const WELCOME_MSG_TRANS = 400;
const HEADER_CTX_MENU_ANIM_TIME = 220;


/**
 * Initiates the main page
 */
async function init() {
    await includeHTML();

    await loadDataFromServer();

    await loadCurrentUserFromServer();

    hasTouch();

    handleWelcomeOnMobile();

    controlMenuHighlighting();



    // currentPage = 'add-task';
    // const selected = document.getElementById(`menu-${currentPage}`);
    // selected.classList.add('nav-item-active');

    // openPage(currentPage, false);
}


async function loadDataFromServer() {
    await downloadFromServer();
    users = await loadFromServer('users');
    tasks = await loadFromServer('tasks');
    categories = await loadFromServer('categories');
}

async function loadCurrentUserFromServer() {
    currentUser = JSON.parse(backend.getItem('currentUser'))
}

/**
 * loading data from server and return it in variable
 * @param {string} key 
 * @returns 
 */
async function loadFromServer(key) {
    let item = [];
    item = JSON.parse(backend.getItem(key)) || [];
    return Array.from(item);
}


/**
 * Saves the data to the server
 * @param {String} key 
 * @param {Array} item 
 */
async function saveOnServer(key, item) {
    itemAsString = JSON.stringify(item);
    await backend.setItem(key, itemAsString);
}

/**
 * Controls the welcome screen on mobile view
 */
function handleWelcomeOnMobile() {
    let isLogin = new URLSearchParams(window.location.search);
    if (!isLogin.get('login')) return;

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
// function openPage(clickedPage, isContext) {
//     const pageToOpen = document.getElementById(clickedPage);
//     const pageToClose = document.getElementById(currentPage);

//     pageToClose.classList.add('d-none');
//     pageToOpen.classList.remove('d-none');

//     if (isContext) {
//         toggleContextMenu();
//     }

//     controlMenuHighlighting(clickedPage, isContext);
//     currentPage = clickedPage;
// }


function getPageName() {
    let path = window.location.pathname;
    path = path.split('/').pop();
    path = path.split('.').shift();
    path = 'menu-' + path;

    console.log(path);

    return path;
}


/**
 * Highlightes the menu item for the current page
 */
function controlMenuHighlighting() {
    const path = getPageName();

    if (path != 'menu-help') {
        let menuToActivate = document.getElementById(path);
        menuToActivate.classList.add('nav-item-active');
    }
}


/**
 * Toggles the visibility of the context menu
 * @param {Object} ctxMenuId The ID of the context menu
 */
function toggleContextMenu(ctxMenuId) {
    const ctxMenu = document.getElementById(ctxMenuId);

    if (ctxMenu.classList.contains('d-none')) {
        showCtxMenu(ctxMenu);
    }
    else {
        hideCtxMenu(ctxMenu);
    }
}


/**
 * Shows the context menu
 * @param {Object} ctxMenu The context menu
 */
function showCtxMenu(ctxMenu) {
    ctxMenu.classList.remove('d-none');
    setTimeout(() => {
        ctxMenu.classList.add('context--show');
    }, 1);
}


/**
 * Hides the context menu
 * @param {Object} ctxMenu The context menu
 */
function hideCtxMenu(ctxMenu) {
    ctxMenu.classList.remove('context--show');
    setTimeout(() => {
        ctxMenu.classList.add('d-none');
    }, HEADER_CTX_MENU_ANIM_TIME);
}

/**
 * Logout and reset currentUser
 */
async function logout() {
    currentUser = [];
    await saveOnServer('currentUser', currentUser);
    window.location.href = './index.html';
}

// Disable Touch On Mobile //

function hasTouch() {
    return 'ontouchstart' in document.documentElement
        || navigator.maxTouchPoints > 0
        || navigator.msMaxTouchPoints > 0;
}

if (hasTouch()) { // remove all the :hover stylesheets
    try { // prevent exception on browsers not supporting DOM styleSheets properly
        for (let si in document.styleSheets) {
            const styleSheet = document.styleSheets[si];
            if (!styleSheet.rules) continue;

            for (var ri = styleSheet.rules.length - 1; ri >= 0; ri--) {
                if (!styleSheet.rules[ri].selectorText) continue;

                if (styleSheet.rules[ri].selectorText.match(':hover')) {
                    styleSheet.deleteRule(ri);
                }
            }
        }
    } catch (ex) { }
}


/**
 * Validating that full name is given
 * @param {Object} username The input field for the user name
 * @param {String} msgElemId The ID of the HTML message element
 * @param {String} className The CSS class name to be used
 * @returns Boolean
 */
function nameValidation(username, msgElemId, className) {
    if (!username.value.includes(' ')) {
        document.getElementById(msgElemId).classList.remove(className);
        return false;
    }
    else {
        document.getElementById(msgElemId).classList.add(className);
        return true;
    }
}

/**
 * Create initials from first letters of Username
 * @param {String} name The full name of the user
 * @returns String
 */
function getInitials(name) {
    const fullName = name.split(' ');
    const initials = fullName.shift().charAt(0) + fullName.pop().charAt(0);
    console.log(initials);
    return initials.toUpperCase();
}

/**
 * Generate random color for User initials background
 * @returns HSL color as String
 */
function generateColors() {
    let h = Math.floor(Math.random() * 359);
    return color = `hsl(${h}, 100%, 50%)`;
}