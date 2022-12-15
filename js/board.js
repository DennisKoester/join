/**
 * Renders all tasks to the board
 */
function initBoard() {
    for (let i = 0; i < tasks.length; i++) {
        const statusContainer = document.getElementById(`tasks-status-${i}`);
        statusContainer.innerHTML = '';
        if (tasks[i].length == 0) {
            showMsgNoTask(i, true);
        }
        else {
            showMsgNoTask(i, false);
            for (let t = 0; t < tasks[i].length; t++) {
                renderTaskCard(i, t);
            }
            
        }
    }
}


/**
 * Toggles the visibility of the "No Task" message of the respective status
 * @param {number} statusId The ID of the respective status
 */
function showMsgNoTask(statusId, isVisible) {
    const msg = document.getElementById(`no-task-status-${statusId}`);
    if (isVisible) {
        msg.classList.remove('d-none');
    }
    else {
        msg.classList.add('d-none');
    }
}


/**
 * Toggles the visibility of a modal
 * @param {String} id The ID of the modal
 */
function toggleModal(id) {
    const modal = document.getElementById(id);
    modal.classList.toggle('d-none');

    if (id == 'modal-add-task') {
        const headerNav = document.getElementById('header-nav');
        headerNav.classList.toggle('header-nav-modal');
    }
}


/**
 * Toggles between reading mode and editing mode in the task viewer modal
 */
function toggleTaskEditMode() {
    const reader = document.getElementById('modal-task-reader');
    const editor = document.getElementById('modal-task-edit');
    reader.classList.toggle('d-none');
    editor.classList.toggle('d-none');
}


/**
 * Saves the changes made in the editor modal
 */
function saveChanges() {

    // TODO: Write the changes to the Array and the Server

    toggleTaskEditMode();

}