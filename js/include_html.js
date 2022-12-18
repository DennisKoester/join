/********************************
ANLEITUNG:
1. Diese Datei in HTML-Datei einbinden
2. <div>-Element, in das ein HTML-Schnipsel eingebunden werden soll, wie folgt attributieren:
	<div w3-include-html="{Datei.html}">...</div>  ==> {Datei.html} verweist auf das einzubindende HTML-Schnispel
3. Funktion includeHTML() nach dem Laden des <body> aufrufen: <body onload="includeHTML()">...</body>
WICHTIG: Dieser Vorgang funktioniert nur auf einem Server (auch mit LiverServer aus VS Code möglich)!
********************************/

async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        await loadHTML(includeElements[i])
    }
}


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