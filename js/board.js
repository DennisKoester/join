function toggleModal(id) {
    const modal = document.getElementById(id);
    modal.classList.toggle('d-none');

    if (id == 'modal-add-task') {
        const headerNav = document.getElementById('header-nav');
        headerNav.classList.toggle('header-nav-modal');
    }
}

function toggleTaskEditMode() {
    const reader = document.getElementById('modal-task-reader');
    const editor = document.getElementById('modal-task-edit');
    reader.classList.toggle('d-none');
    editor.classList.toggle('d-none');
}

function saveChanges() {


    toggleTaskEditMode();

}