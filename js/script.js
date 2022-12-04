let currentPage = '';

async function init() {
    await includeHTML();

    // TODO: init the menu depending on desktop or mobile view
    const menuSummary = document.getElementById('menu-summary');
    menuSummary.classList.add('nav-item-active');
    currentPage = 'summary';
    openPage(currentPage, false);
}


function openPage(id, context) {
    const pageToOpen = document.getElementById(id);
    const pageToClose = document.getElementById(currentPage);

    pageToClose.classList.add('d-none');
    pageToOpen.classList.remove('d-none');

    if (id == 'help' && !context) return;

    if (context) {
        // TODO: Close context menu
    }
    else {
        const menuToActivate = document.getElementById(`menu-${id}`);
        const menuToDeactivate = document.getElementById(`menu-${currentPage}`);

        menuToDeactivate.classList.remove('nav-item-active');
        menuToActivate.classList.add('nav-item-active');

        currentPage = id;
    }
}


function logout() {

}