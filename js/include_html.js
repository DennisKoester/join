/**
 * Loads HTML Code into elements signed with [w3-include-html]
 */
async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        await loadHTML(includeElements[i])
    }
}


/**
 * Adds HTML code to from a file to the given element
 * @param {Object} _element The HTML element to which code should be added
 * @param {String} _file The source file name
 */
async function loadHTML(_element, _file) {
    // const element = includeElements[i];
    let file = _file;
    let element = _element;
    
    if (!file) {
        file = element.getAttribute("w3-include-html");
    }
    else {
        element = document.getElementById(_element);
    }
    
    let resp = await fetch(file);
    if (resp.ok) {
        element.innerHTML = await resp.text();
    } else {
        element.innerHTML = 'Page not found';
    }
}